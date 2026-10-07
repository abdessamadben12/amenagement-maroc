import { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

const FORMATS = [
  'header', 'bold', 'italic', 'underline', 'strike', 'color', 'background',
  'list', 'indent', 'align', 'blockquote', 'code-block', 'link', 'image', 'video',
]

/** Éditeur riche Quill : les images sont envoyées au serveur au lieu d'être intégrées en base64. */
export default function RichTextEditor({ value, onChange, onUpload, onError }) {
  const quillRef = useRef(null)
  // Garde la dernière fonction d'upload sans recréer les modules (Quill ne les relit pas).
  const uploadRef = useRef(onUpload)
  uploadRef.current = onUpload
  const errorRef = useRef(onError)
  errorRef.current = onError

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        [{ align: [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        image() {
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = 'image/jpeg,image/png,image/webp,image/gif'
          input.onchange = async () => {
            const file = input.files?.[0]
            if (!file) return
            try {
              const url = await uploadRef.current(file)
              const editor = quillRef.current.getEditor()
              const range = editor.getSelection(true)
              // Chemin relatif (/uploads/...) : valable en production comme en dev (proxy Vite).
              editor.insertEmbed(range.index, 'image', url, 'user')
              editor.setSelection(range.index + 1)
            } catch (e) {
              errorRef.current?.(e.message)
            }
          }
          input.click()
        },
      },
    },
    clipboard: { matchVisual: false },
  }), [])

  return (
    <div className="admin-editor rounded-md bg-white">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={FORMATS}
        placeholder="Rédigez votre article…"
      />
    </div>
  )
}
