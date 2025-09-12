/// <reference types="mdast" />
import { h } from 'hastscript'

/**
 * Creates a GitHub Gist Card component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.gist - The GitHub gist ID.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created GitHub Gist Card component.
 */
export function GithubGistCardComponent(properties, children) {
  if (Array.isArray(children) && children.length !== 0)
    return h('div', { class: 'hidden' }, [
      'Invalid directive. ("github" directive must be leaf type "::github{gist=\"gist-id\"}")',
    ])

  const gistId = properties.gist
  if (!gistId || gistId.trim() === '')
    return h(
      'div',
      { class: 'hidden' },
      'Invalid GitHub gist. ("gist" attribute must be provided)',
    )

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
        document.getElementById('${cardUuid}-forks').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.forks.length || 0).replaceAll("\\u202f", '');
        document.getElementById('${cardUuid}-comments').innerText = Intl.NumberFormat('en-us', { notation: "compact", maximumFractionDigits: 1 }).format(data.comments).replaceAll("\\u202f", '');

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