import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DocumentsTab = ({ documents, onUpload, onDelete }) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDocument, setSelectedDocument] = useState(null);

  const categories = [
    { id: 'todos', label: 'Todos', icon: 'Files' },
    { id: 'manuales', label: 'Manuales', icon: 'Book' },
    { id: 'certificados', label: 'Certificados', icon: 'Award' },
    { id: 'garantias', label: 'Garantías', icon: 'Shield' },
    { id: 'fotos', label: 'Fotos', icon: 'Camera' },
    { id: 'reportes', label: 'Reportes', icon: 'FileText' }
  ];

  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'jpg': case'jpeg': case'png': case'gif':
        return 'Image';
      case 'doc': case'docx':
        return 'FileText';
      case 'xls': case'xlsx':
        return 'FileSpreadsheet';
      default:
        return 'File';
    }
  };

  const getFileTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return 'text-error';
      case 'jpg': case'jpeg': case'png': case'gif':
        return 'text-success';
      case 'doc': case'docx':
        return 'text-primary';
      case 'xls': case'xlsx':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredDocuments = selectedCategory === 'todos' 
    ? documents 
    : documents?.filter(doc => doc?.category === selectedCategory);

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    files?.forEach(file => {
      if (onUpload) {
        onUpload(file);
      }
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-card rounded-lg border border-border p-4 medical-shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="FolderOpen" size={20} className="mr-2" />
            Documentos y Archivos
          </h2>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex border border-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Icon name="Grid3X3" size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <Icon name="List" size={16} />
              </Button>
            </div>

            {/* Upload Button */}
            <div className="relative">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
              />
              <Button variant="default" size="sm" iconName="Upload" iconPosition="left">
                Subir Archivos
              </Button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories?.map((category) => (
            <Button
              key={category?.id}
              variant={selectedCategory === category?.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category?.id)}
              iconName={category?.icon}
              iconPosition="left"
            >
              {category?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Documents Display */}
      {filteredDocuments?.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-8 text-center medical-shadow-sm">
          <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No hay documentos</h3>
          <p className="text-muted-foreground mb-4">
            No se encontraron documentos en esta categoría.
          </p>
          <div className="relative inline-block">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
            />
            <Button variant="default" iconName="Upload" iconPosition="left">
              Subir Primer Documento
            </Button>
          </div>
        </div>
      ) : (
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-2'}`}>
          {filteredDocuments?.map((document) => (
            <div key={document?.id} className={`bg-card rounded-lg border border-border medical-shadow-sm hover:medical-shadow-md medical-transition ${viewMode === 'list' ? 'p-4' : 'p-3'}`}>
              {viewMode === 'grid' ? (
                /* Grid View */
                (<div className="text-center">
                  {document?.type?.toLowerCase()?.includes('jpg') || 
                   document?.type?.toLowerCase()?.includes('jpeg') || 
                   document?.type?.toLowerCase()?.includes('png') || 
                   document?.type?.toLowerCase()?.includes('gif') ? (
                    <div className="w-full h-32 bg-muted rounded-lg overflow-hidden mb-3">
                      <Image
                        src={document?.url}
                        alt={document?.name}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setSelectedDocument(document)}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center mb-3">
                      <Icon 
                        name={getFileIcon(document?.type)} 
                        size={48} 
                        className={getFileTypeColor(document?.type)}
                      />
                    </div>
                  )}
                  <h3 className="font-medium text-foreground text-sm mb-1 truncate" title={document?.name}>
                    {document?.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {formatFileSize(document?.size)} • {document?.uploadDate}
                  </p>
                  <div className="flex justify-center space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Icon name="Download" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-error hover:text-error">
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>)
              ) : (
                /* List View */
                (<div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Icon 
                      name={getFileIcon(document?.type)} 
                      size={24} 
                      className={getFileTypeColor(document?.type)}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{document?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(document?.size)} • Subido el {document?.uploadDate}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-error hover:text-error">
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>)
              )}
            </div>
          ))}
        </div>
      )}
      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden medical-shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">{selectedDocument?.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDocument(null)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="p-4 max-h-[calc(90vh-120px)] overflow-auto">
              {selectedDocument?.type?.toLowerCase()?.includes('jpg') || 
               selectedDocument?.type?.toLowerCase()?.includes('jpeg') || 
               selectedDocument?.type?.toLowerCase()?.includes('png') || 
               selectedDocument?.type?.toLowerCase()?.includes('gif') ? (
                <Image
                  src={selectedDocument?.url}
                  alt={selectedDocument?.name}
                  className="w-full h-auto max-h-full object-contain"
                />
              ) : (
                <div className="text-center py-12">
                  <Icon name={getFileIcon(selectedDocument?.type)} size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Vista previa no disponible para este tipo de archivo</p>
                  <Button variant="default" iconName="Download" iconPosition="left">
                    Descargar Archivo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Upload Progress Indicator */}
      <div className="bg-card rounded-lg border border-border p-4 medical-shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Almacenamiento Utilizado</span>
          <span className="text-sm text-muted-foreground">
            {formatFileSize(documents?.reduce((total, doc) => total + doc?.size, 0))} / 1 GB
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full" 
            style={{ 
              width: `${Math.min((documents?.reduce((total, doc) => total + doc?.size, 0) / (1024 * 1024 * 1024)) * 100, 100)}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTab;