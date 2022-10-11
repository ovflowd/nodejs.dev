import { graphql } from 'gatsby';
import ArticleLayout from '../../components/Layout/article';
import connectGraphQlArticle from '../../components/connectGraphQlArticle';
import { AboutNavigationKeys } from '../../types';

export default connectGraphQlArticle(ArticleLayout, {
  editPath: 'content/download/package-manager.md',
  currentSlug: AboutNavigationKeys.packageManager,
});

export const query = graphql`
  query ($locale: String!, $defaultLocale: String!) {
    articleCurrentLanguage: mdx(
      fields: {
        slug: { eq: "installing-nodejs-via-package-manager" }
        locale: { eq: $locale }
      }
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
      fields: {
        slug: { eq: "installing-nodejs-via-package-manager" }
        locale: { eq: $defaultLocale }
      }
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
  }
`;
