import React from 'react';
import { graphql } from 'gatsby';
import ArticleLayout from '../../components/Layout/article';
import DownloadTable from '../../components/DownloadReleases/DownloadTable';
import connectGraphQlArticle from '../../components/connectGraphQlArticle';
import { NodeReleaseData, AboutNavigationKeys } from '../../types';

export interface ReleasesNodeReleases {
  nodeReleases: {
    nodeReleasesData: NodeReleaseData[];
  };
}

export default connectGraphQlArticle(ArticleLayout, {
  editPath: 'content/about/releases.md',
  currentSlug: AboutNavigationKeys.releases,
  articleContent: (props: ReleasesNodeReleases) => (
    <DownloadTable
      nodeReleasesData={props.nodeReleases.nodeReleasesData.filter(
        release => release.status !== 'End-of-life'
      )}
    />
  ),
});

export const query = graphql`
  query ($locale: String!, $defaultLocale: String!) {
    articleCurrentLanguage: mdx(
      fields: { slug: { eq: "releases" }, locale: { eq: $locale } }
    ) {
      body
      tableOfContents
      frontmatter {
        title
        description
        displayTitle
      }
      fields {
        authors
      }
    }
    articleDefaultLanguage: mdx(
      fields: { slug: { eq: "releases" }, locale: { eq: $defaultLocale } }
    ) {
      body
      tableOfContents
      frontmatter {
        title
        description
        displayTitle
      }
      fields {
        authors
      }
    }
    nodeReleases {
      nodeReleasesData {
        fullVersion
        version
        codename
        isLts
        status
        initialRelease
        ltsStart
        maintenanceStart
        endOfLife
      }
    }
  }
`;
