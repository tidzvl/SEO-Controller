import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NodesSidebar from '@/components/NodesSidebar'

const Overview: NextPage = () => {
  const { t } = useTranslation('common')
  
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <NodesSidebar />
        <main className="flex-1 overflow-auto bg-background">
          <div className="h-full p-6">
            <div className="flex items-center justify-center h-full border-2 border-dashed border-border/50 rounded-lg bg-muted/10">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">Canvas Area</h2>
                <p className="text-muted-foreground">
                  Drag and drop nodes from the sidebar to start building your workflow
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
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

export default Overview
