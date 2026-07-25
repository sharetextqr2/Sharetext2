import React from 'react';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { AdContainer } from '@/components/shared/ad-container';
import { PageContainer } from '@/components/shared/page-container';

interface ToolLayoutProps {
  breadcrumbItems: { label: string; href?: string }[];
  header: React.ReactNode;
  interface: React.ReactNode;
  relatedTools: React.ReactNode;
  faq: React.ReactNode;
  latestArticles: React.ReactNode;
}

export function ToolLayout(props: ToolLayoutProps) {
  return (
    <>
      <div className="pt-20 md:pt-24">
        <PageContainer>
          <Breadcrumb items={props.breadcrumbItems} />
        </PageContainer>
      </div>

      <PageContainer className="pb-8">
        {props.header}
        <div className="mt-6">
          {props.interface}
        </div>
      </PageContainer>

      <div className="bg-gray-50">
        <PageContainer className="py-12">
          <AdContainer />
        </PageContainer>
      </div>

      <PageContainer className="py-12">
        {props.relatedTools}
      </PageContainer>

      <div className="bg-gray-50">
        <PageContainer className="py-12">
          <AdContainer />
        </PageContainer>
      </div>

      <PageContainer className="py-12">
        {props.faq}
      </PageContainer>

      <div className="bg-gray-50">
        <PageContainer className="py-12">
          <AdContainer />
        </PageContainer>
      </div>

      <PageContainer className="py-12">
        {props.latestArticles}
      </PageContainer>
    </>
  );
}
