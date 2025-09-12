/// <reference types="mdast" />
import { h } from 'hastscript'

/**
 * Creates a GitHub Card component for both repositories and gists.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} [properties.repo] - The GitHub repository in the format "owner/repo".
 * @param {string} [properties.gist] - The GitHub gist ID.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created GitHub Card component.
 */
export function GithubCardComponent(properties, children) {
  if (Array.isArray(children) && children.length !== 0)
    return h('div', { class: 'hidden' }, [
      'Invalid directive. ("github" directive must be leaf type "::github{repo="owner/repo"}" or "::github{gist="gist-id"}")',
    ])

  // Check if we have repo (with / for repository, without for organization), or gist property
  const hasRepo = properties.repo?.includes('/')
  const hasOrg = properties.repo && !properties.repo.includes('/')
  const hasGist = properties.gist && properties.gist.trim() !== ''

  if (!hasRepo && !hasOrg && !hasGist)
    return h(
      'div',
      { class: 'hidden' },
      'Invalid GitHub reference. ("repo" attribute must be in the format "owner/repo" for repositories or "org" for organizations, or "gist" attribute must be provided)',
    )

  const optionsCount = [hasRepo, hasOrg, hasGist].filter(Boolean).length
  if (optionsCount > 1)
    return h(
      'div',
      { class: 'hidden' },
      'Invalid GitHub reference. (provide either "repo" for repository, organization name, or "gist" attribute, not multiple)',
    )

  // Handle repository cards
  if (hasRepo) {
    const repo = properties.repo
    const cardUuid = `GC${Math.random().toString(36).slice(-6)}` // Collisions are not important

    const nAvatar = h(`div#${cardUuid}-avatar`, { class: 'gc-avatar' })
    const nLanguage = h(
      `span#${cardUuid}-language`,
      { class: 'gc-language' },
      'Waiting...',
    )

    const nTitle = h('div', { class: 'gc-titlebar' }, [
      h('div', { class: 'gc-titlebar-left' }, [
        h('div', { class: 'gc-owner' }, [
          nAvatar,
          h('div', { class: 'gc-user' }, repo.split('/')[0]),
        ]),
        h('div', { class: 'gc-divider' }, '/'),
        h('div', { class: 'gc-repo' }, repo.split('/')[1]),
      ]),
      h('div', { class: 'github-logo' }),
    ])

    const nDescription = h(
      `div#${cardUuid}-description`,
      { class: 'gc-description' },
      'Waiting for api.github.com...',
    )

    const nStars = h(`div#${cardUuid}-stars`, { class: 'gc-stars' }, '00K')
    const nForks = h(`div#${cardUuid}-forks`, { class: 'gc-forks' }, '0K')
    const nLicense = h(`div#${cardUuid}-license`, { class: 'gc-license' }, '0K')

    const nScript = h(
      `script#${cardUuid}-script`,
      { type: 'text/javascript', defer: true },
      `
        fetch('https://api.github.com/repos/${repo}', { referrerPolicy: "no-referrer" }).then(response => response.json()).then(data => {
          if (data.description) {
            document.getElementById('${cardUuid}-description').innerText = data.description.replace(/:[a-zA-Z0-9_]+:/g, '');
          } else {
            document.getElementById('${cardUuid}-description').innerText = "Description not set"
          }
          document.getElementById('${cardUuid}-language').innerText = data.language;
          document.getElementById('${cardUuid}-forks').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.forks).replaceAll("\u202f", '');
          document.getElementById('${cardUuid}-stars').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.stargazers_count).replaceAll("\u202f", '');
          const avatarEl = document.getElementById('${cardUuid}-avatar');
          avatarEl.style.backgroundImage = 'url(' + data.owner.avatar_url + ')';
          avatarEl.style.backgroundColor = 'transparent';
          if (data.license?.spdx_id) {
            document.getElementById('${cardUuid}-license').innerText = data.license?.spdx_id
          } else {
            document.getElementById('${cardUuid}-license').innerText = "no-license"
          };
            document.getElementById('${cardUuid}-card').classList.remove("fetch-waiting");
            console.log("[GITHUB-CARD] Loaded card for ${repo} | ${cardUuid}.")
        }).catch(err => {
          const c = document.getElementById('${cardUuid}-card');
          c.classList.add("fetch-error");
           console.warn("[GITHUB-CARD] (Error) Loading card for ${repo} | ${cardUuid}.")
        })
      `,
    )

    return h(
      `a#${cardUuid}-card`,
      {
        class: 'card-github fetch-waiting no-styling',
        href: `https://github.com/${repo}`,
        target: '_blank',
        repo,
      },
      [
        nTitle,
        nDescription,
        h('div', { class: 'gc-infobar' }, [
          nStars,
          nForks,
          nLicense,
          nLanguage,
        ]),
        nScript,
      ],
    )
  }

  // Handle organization cards
  if (hasOrg) {
    const org = properties.repo
    const cardUuid = `GC${Math.random().toString(36).slice(-6)}` // Collisions are not important

    const nAvatar = h(`div#${cardUuid}-avatar`, { class: 'gc-avatar' })

    const nTitle = h('div', { class: 'gc-titlebar' }, [
      h('div', { class: 'gc-titlebar-left' }, [
        h('div', { class: 'gc-owner' }, [
          nAvatar,
          h('div', { class: 'gc-user' }, org),
        ]),
      ]),
      h('div', { class: 'github-logo' }),
    ])

    const nDescription = h(
      `div#${cardUuid}-description`,
      { class: 'gc-description' },
      'Waiting for api.github.com...',
    )

    const nRepos = h(`div#${cardUuid}-repos`, { class: 'gc-stars' }, '0')
    const nFollowers = h(
      `div#${cardUuid}-followers`,
      { class: 'gc-forks' },
      '0',
    )
    const nLocation = h(
      `div#${cardUuid}-location`,
      { class: 'gc-license' },
      'N/A',
    )

    const nScript = h(
      `script#${cardUuid}-script`,
      { type: 'text/javascript', defer: true },
      `
        fetch('https://api.github.com/orgs/${org}', { referrerPolicy: "no-referrer" }).then(response => response.json()).then(data => {
          if (data.description) {
            document.getElementById('${cardUuid}-description').innerText = data.description.replace(/:[a-zA-Z0-9_]+:/g, '');
          } else {
            document.getElementById('${cardUuid}-description').innerText = "Description not set"
          }
          document.getElementById('${cardUuid}-repos').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.public_repos || 0).replaceAll("\\u202f", '');
          document.getElementById('${cardUuid}-followers').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.followers || 0).replaceAll("\\u202f", '');

          const avatarEl = document.getElementById('${cardUuid}-avatar');
          avatarEl.style.backgroundImage = 'url(' + data.avatar_url + ')';
          avatarEl.style.backgroundColor = 'transparent';

          if (data.location) {
            document.getElementById('${cardUuid}-location').innerText = data.location;
          } else {
            document.getElementById('${cardUuid}-location').innerText = "No location"
          }

          document.getElementById('${cardUuid}-card').classList.remove("fetch-waiting");
          console.log("[GITHUB-ORG] Loaded card for ${org} | ${cardUuid}.");
        }).catch(err => {
          const c = document.getElementById('${cardUuid}-card');
          c.classList.add("fetch-error");
          console.warn("[GITHUB-ORG] (Error) Loading card for ${org} | ${cardUuid}.");
        })
      `,
    )

    return h(
      `a#${cardUuid}-card`,
      {
        class: 'card-github fetch-waiting no-styling',
        href: `https://github.com/${org}`,
        target: '_blank',
        org,
      },
      [
        nTitle,
        nDescription,
        h('div', { class: 'gc-infobar' }, [nRepos, nFollowers, nLocation]),
        nScript,
      ],
    )
  }

  // Handle gist cards
  if (hasGist) {
    const gistId = properties.gist
    const cardUuid = `GC${Math.random().toString(36).slice(-6)}` // Collisions are not important

    const nAvatar = h(`div#${cardUuid}-avatar`, { class: 'gc-avatar' })
    const nLanguage = h(
      `span#${cardUuid}-language`,
      { class: 'gc-language' },
      'Waiting...',
    )

    const nTitle = h('div', { class: 'gc-titlebar' }, [
      h('div', { class: 'gc-titlebar-left' }, [
        h('div', { class: 'gc-owner' }, [
          nAvatar,
          h(`div#${cardUuid}-user`, { class: 'gc-user' }, 'Loading...'),
        ]),
        h('div', { class: 'gc-divider' }, '/'),
        h(`div#${cardUuid}-filename`, { class: 'gc-repo' }, 'Loading...'),
      ]),
      h('div', { class: 'github-logo' }),
    ])

    const nDescription = h(
      `div#${cardUuid}-description`,
      { class: 'gc-description' },
      'Waiting for api.github.com...',
    )

    const nForks = h(`div#${cardUuid}-forks`, { class: 'gc-forks' }, '0K')
    const nComments = h(`div#${cardUuid}-comments`, { class: 'gc-stars' }, '0')

    const nScript = h(
      `script#${cardUuid}-script`,
      { type: 'text/javascript', defer: true },
      `
        fetch('https://api.github.com/gists/${gistId}', { referrerPolicy: "no-referrer" }).then(response => response.json()).then(data => {
          if (data.description) {
            document.getElementById('${cardUuid}-description').innerText = data.description.replace(/:[a-zA-Z0-9_]+:/g, '');
          } else {
            document.getElementById('${cardUuid}-description').innerText = "Description not set"
          }

          const firstFile = Object.values(data.files)[0];
          if (firstFile) {
            document.getElementById('${cardUuid}-language').innerText = firstFile.language || 'Text';
            document.getElementById('${cardUuid}-filename').innerText = firstFile.filename;
          }

          document.getElementById('${cardUuid}-user').innerText = data.owner.login;
          document.getElementById('${cardUuid}-forks').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.forks.length || 0).replaceAll("\u202f", '');
          document.getElementById('${cardUuid}-comments').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.comments).replaceAll("\u202f", '');

          const avatarEl = document.getElementById('${cardUuid}-avatar');
          avatarEl.style.backgroundImage = 'url(' + data.owner.avatar_url + ')';
          avatarEl.style.backgroundColor = 'transparent';

          document.getElementById('${cardUuid}-card').classList.remove("fetch-waiting");
          console.log("[GITHUB-GIST] Loaded card for ${gistId} | ${cardUuid}.")
        }).catch(err => {
          const c = document.getElementById('${cardUuid}-card');
          c.classList.add("fetch-error");
          console.warn("[GITHUB-GIST] (Error) Loading card for ${gistId} | ${cardUuid}.")
        })
      `,
    )

    return h(
      `a#${cardUuid}-card`,
      {
        class: 'card-github fetch-waiting no-styling',
        href: `https://gist.github.com/${gistId}`,
        target: '_blank',
        gist: gistId,
      },
      [
        nTitle,
        nDescription,
        h('div', { class: 'gc-infobar' }, [nComments, nForks, nLanguage]),
        nScript,
      ],
    )
  }
}
