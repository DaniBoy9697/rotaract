import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ImagePlus, Video } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WORDPRESS_CONFIG = {
  apiUrl: process.env.REACT_APP_WORDPRESS_API || '',
};

const categories = [
  { id: '1', label: 'Medio Ambiente', slug: 'medio-ambiente' },
  { id: '2', label: 'Desarrollo del Liderazgo', slug: 'liderazgo' },
  { id: '3', label: 'Salud', slug: 'salud' },
  { id: '4', label: 'Intercambio Internacional', slug: 'internacional' },
  { id: '5', label: 'Educación', slug: 'educacion' },
];

function getCategoryId(categoryId: string): number {
  return categoryId ? parseInt(categoryId, 10) : 1;
}

async function uploadMediaToWordPress(file: File): Promise<{ url: string; id: number } | null> {
  try {
    const jwtToken = localStorage.getItem('rotaract_jwt');
    if (!jwtToken) return null;
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(
      `${WORDPRESS_CONFIG.apiUrl}/media`,
      formData,
      {
        headers: {
          'Content-Disposition': `attachment; filename="${file.name}"`,
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return { url: response.data.source_url, id: response.data.id };
  } catch (error) {
    console.error('Error uploading media to WordPress:', error);
    return null;
  }
}

export interface CreatePostFormUser {
  name: string;
  avatar?: string;
  club?: string;
}

interface CreatePostFormProps {
  user: CreatePostFormUser;
  onSuccess: () => void;
}

export function CreatePostForm({ user, onSuccess }: CreatePostFormProps) {
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    image: '',
    featuredMediaId: 0 as number,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const quillRef = useRef<ReactQuill>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploadingFile(true);
    const quill = quillRef.current?.getEditor();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      if (!isImage && !isVideo) continue;
      const result = await uploadMediaToWordPress(file);
      if (result && quill) {
        const range = quill.getSelection(true);
        if (isImage) {
          quill.insertEmbed(range?.index ?? quill.getLength(), 'image', result.url);
        } else {
          quill.insertText(range?.index ?? quill.getLength(), `\n[Video: ${result.url}]\n`, 'link', result.url);
        }
        if (!newPost.featuredMediaId && isImage) {
          setNewPost((prev) => ({ ...prev, featuredMediaId: result.id, image: result.url }));
        }
      }
    }
    setUploadingFile(false);
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const postData = {
        ...newPost,
        author: user.name,
        authorAvatar: user.avatar,
        club: user.club ?? '',
        date: new Date().toISOString().split('T')[0],
      };
      const jwtToken = localStorage.getItem('rotaract_jwt');
      const wpPostData: Record<string, unknown> = {
        title: postData.title,
        content: postData.content,
        status: 'draft',
        categories: [getCategoryId(postData.category)],
        meta: {
          rotaract_club: postData.club,
          rotaract_author: postData.author,
        },
      };
      if (postData.featuredMediaId) {
        wpPostData.featured_media = postData.featuredMediaId;
      }
      await axios.post(`${WORDPRESS_CONFIG.apiUrl}/posts`, wpPostData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setNewPost({ title: '', content: '', category: '', image: '', featuredMediaId: 0 });
      onSuccess();
    } catch (error) {
      console.error('Error creating post in WordPress:', error);
      const { toast } = await import('sonner');
      toast.error('Error al crear el post. Inténtalo de nuevo.');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="create-post-title" className="mb-2">Título del Post</Label>
        <Input
          id="create-post-title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          placeholder="Escribe un título atractivo"
          required
        />
      </div>
      <div>
        <Label htmlFor="create-post-category" className="mb-2">Categoría</Label>
        <Select
          value={newPost.category}
          onValueChange={(value: string) => setNewPost({ ...newPost, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2">Contenido</Label>
        <div className="create-post-quill-wrapper rounded-md border border-gray-200 bg-white overflow-hidden">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={newPost.content}
            onChange={(content) => setNewPost({ ...newPost, content })}
            modules={quillModules}
            placeholder="Describe tu proyecto, actividad o noticia..."
            className="create-post-quill min-h-[280px] [&_.ql-container]:border-0 [&_.ql-editor]:min-h-[260px]"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Imágenes y videos</Label>
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingFile}
          >
            <ImagePlus className="w-4 h-4 mr-2" />
            {uploadingFile ? 'Subiendo...' : 'Subir imagen'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingFile}
          >
            <Video className="w-4 h-4 mr-2" />
            Subir video
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Las imágenes se insertan en el texto; la primera será la portada del post.
        </p>
      </div>
      <div>
        <Label htmlFor="create-post-image">URL de imagen de portada (opcional)</Label>
        <Input
          id="create-post-image"
          type="url"
          value={newPost.image}
          onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || !newPost.content.trim()}
        style={{ backgroundColor: 'var(--rotaract-pink)' }}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Post para Revisión'}
      </Button>
    </form>
  );
}
