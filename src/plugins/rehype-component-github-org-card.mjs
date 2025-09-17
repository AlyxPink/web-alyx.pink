/// <reference types="mdast" />
import { h } from 'hastscript'

/**
 * Creates a GitHub Organization Card component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.org - The GitHub organization name.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created GitHub Organization Card component.
 */
export function GithubOrgCardComponent(properties, children) {
  if (Array.isArray(children) && children.length !== 0)
    return h('div', { class: 'hidden' }, [
      'Invalid directive. ("github" directive must be leaf type "::github{org=\"organization-name\"}")',
    ])

  const org = properties.org
  if (!org || org.trim() === '')
    return h(
      'div',
      { class: 'hidden' },
      'Invalid GitHub organization. ("org" attribute must be provided)',
    )

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
        document.getElementById('${cardUuid}-repos').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.public_repos || 0).replaceAll("\\\\u202f", '');
        document.getElementById('${cardUuid}-followers').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.followers || 0).replaceAll("\\\\u202f", '');

        const avatarEl = document.getElementById('${cardUuid}-avatar');
        avatarEl.style.backgroundImage = 'url(' + data.avatar_url + ')';
        avatarEl.style.backgroundColor = 'transparent';


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
      h('div', { class: 'gc-infobar' }, [nRepos, nFollowers]),
      nScript,
    ],
  )
}