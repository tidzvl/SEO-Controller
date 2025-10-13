import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { storage, SavedWorkflow } from '@/lib/storage'
import { Trash2, Play, FolderOpen } from 'lucide-react'

const Workflow: NextPage = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [workflows, setWorkflows] = useState<SavedWorkflow[]>([])

  useEffect(() => {
    loadWorkflows()
  }, [])

  const loadWorkflows = () => {
    const allWorkflows = storage.loadAllWorkflows()
    setWorkflows(allWorkflows)
  }

  const handleLoad = (workflow: SavedWorkflow) => {
    storage.saveDraft(workflow.data)
    router.push('/overview')
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      storage.deleteWorkflow(id)
      loadWorkflows()
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('navbar.workflow')}</h1>
          <p className="text-muted-foreground">
            Manage your saved workflows
          </p>
        </div>

        {workflows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No workflows yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first workflow in the Overview page
            </p>
            <button
              onClick={() => router.push('/overview')}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Go to Overview
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="border border-border rounded-lg p-6 bg-card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold truncate flex-1">
                    {workflow.name}
                  </h3>
                  <button
                    onClick={() => handleDelete(workflow.id)}
                    className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors ml-2"
                    aria-label="Delete workflow"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Nodes:</span>
                    <span className="font-medium text-foreground">
                      {workflow.data.nodes.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Connections:</span>
                    <span className="font-medium text-foreground">
                      {workflow.data.edges.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span className="font-medium text-foreground">
                      {formatDate(workflow.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Updated:</span>
                    <span className="font-medium text-foreground">
                      {formatDate(workflow.updatedAt)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleLoad(workflow)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Play className="h-4 w-4" />
                  Load Workflow
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Workflow
