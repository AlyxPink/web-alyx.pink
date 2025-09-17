/// <reference types="mdast" />
import { h } from 'hastscript'
import { GithubRepoCardComponent } from './rehype-component-github-repo-card.mjs'
import { GithubOrgCardComponent } from './rehype-component-github-org-card.mjs'
import { GithubGistCardComponent } from './rehype-component-github-gist-card.mjs'

/**
 * Creates a GitHub Card component dispatcher for repositories, organizations, and gists.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} [properties.repo] - The GitHub repository in the format "owner/repo".
 * @param {string} [properties.org] - The GitHub organization name.
 * @param {string} [properties.gist] - The GitHub gist ID.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created GitHub Card component.
 */
export function GithubCardComponent(properties, children) {
  if (Array.isArray(children) && children.length !== 0)
    return h('div', { class: 'hidden' }, [
      'Invalid directive. ("github" directive must be leaf type "::github{repo=\"owner/repo\"}", "::github{org=\"organization-name\"}", or "::github{gist=\"gist-id\"}")',
    ])

  // Check which type of GitHub reference we have
  const hasRepo = properties.repo && properties.repo.trim() !== ''
  const hasOrg = properties.org && properties.org.trim() !== ''
  const hasGist = properties.gist && properties.gist.trim() !== ''

  // Count how many attributes are provided
  const optionsCount = [hasRepo, hasOrg, hasGist].filter(Boolean).length

  if (optionsCount === 0)
    return h(
      'div',
      { class: 'hidden' },
      'Invalid GitHub reference. (provide either "repo" for repository, "org" for organization, or "gist" attribute)',
    )

  if (optionsCount > 1)
    return h(
      'div',
      { class: 'hidden' },
      'Invalid GitHub reference. (provide only one: "repo", "org", or "gist" attribute, not multiple)',
    )

  // Route to appropriate component
  if (hasRepo) {
return GithubRepoCardComponent(properties, children)
  }

  if (hasOrg) {
return GithubOrgCardComponent(properties, children)
  }

  if (hasGist) {
return GithubGistCardComponent(properties, children)
  }

  // This should never be reached due to the validation above
  return h(
    'div',
    { class: 'hidden' },
    'Unexpected error: no valid GitHub reference found',
  )
}