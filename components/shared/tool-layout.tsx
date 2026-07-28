import React from 'react';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { PageContainer } from '@/components/shared/page-container';

interface ToolLayoutProps {
  breadcrumbItems: { label: string; href?: string }[];
  header: React.ReactNode;
  interface: React.ReactNode;
  howToUse?: React.ReactNode;
  features?: React.ReactNode;
  benefits?: React.ReactNode;
  relatedTools: React.ReactNode;
  faq: React.ReactNode;
  conclusion?: React.ReactNode;
  latestArticles: React.ReactNode;
}

export function ToolLayout(props: ToolLayoutProps) {
  return (
    <>
      <div className="pt-24 md:pt-28">
        <PageContainer>
          <Breadcrumb items={props.breadcrumbItems} />
        </PageContainer>
      </div>

      <PageContainer className="pb-8">
        {props.header}
        <div className="mt-8">
          {props.interface}
        </div>
      </PageContainer>

      {props.howToUse && (
        <section className="py-12 md:py-16 bg-gray-50/50 border-t border-gray-100">
          <PageContainer>
            {props.howToUse}
          </PageContainer>
        </section>
      )}

      {props.features && (
        <section className="py-12 md:py-16">
          <PageContainer>
            {props.features}
          </PageContainer>
        </section>
      )}

      {props.benefits && (
        <section className="py-12 md:py-16 bg-gray-50/50 border-t border-gray-100">
          <PageContainer>
            {props.benefits}
          </PageContainer>
        </section>
      )}

      <PageContainer className="py-12 md:py-16">
        {props.relatedTools}
      </PageContainer>

      <PageContainer className="py-12 md:py-16">
        {props.faq}
      </PageContainer>

      {props.conclusion && (
        <section className="py-12 md:py-16 bg-gray-50/50 border-t border-gray-100">
          <PageContainer>
            {props.conclusion}
          </PageContainer>
        </section>
      )}

      <PageContainer className="py-12 md:py-16">
        {props.latestArticles}
      </PageContainer>
    </>
  );
}
