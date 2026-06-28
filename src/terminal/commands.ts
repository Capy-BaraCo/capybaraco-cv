import { Command } from './types'
import { profile } from '../data/profile'

const commands: Command[] = [
  {
    name: 'help',
    description: 'Show available commands',
    usage: 'help',
    handler: () => ({
      success: true,
      output: [
        '┌─ Available Commands ─────────────────────────────────────┐',
        '│                                                          │',
        '│  cv --help              Show CV-related commands         │',
        '│  cv --download-pdf      Download CV as PDF              │',
        '│  cv --view-html         View CV in HTML format          │',
        '│  contact --show         Display contact information     │',
        '│  portfolio --help       Show portfolio information      │',
        '│  whoami                 Display current user info       │',
        '│  clear                  Clear terminal output           │',
        '│  help                   Show this message               │',
        '│                                                          │',
        '└──────────────────────────────────────────────────────────┘',
      ],
    }),
    aliases: ['?'],
  },

  {
    name: 'cv',
    description: 'Manage your CV',
    usage: 'cv [--help | --download-pdf | --view-html]',
    handler: (args) => {
      const subcommand = args[0]

      if (!subcommand || subcommand === '--help') {
        return {
          success: true,
          output: [
            'CV Management',
            '',
            'Usage: cv [OPTIONS]',
            '',
            'Options:',
            '  --help              Show this help message',
            '  --download-pdf      Download your CV as a PDF file',
            '  --view-html         View your CV in HTML format',
            '',
            'Examples:',
            '  $ cv --help',
            '  $ cv --download-pdf',
            '  $ cv --view-html',
          ],
        }
      }

      if (subcommand === '--download-pdf') {
        // The actual download is performed by the React layer via this action,
        // keeping the handler free of DOM side-effects.
        return {
          success: true,
          output: 'Downloading CV... (aaron-paterson-cv.pdf)',
          action: {
            type: 'download',
            url: '/assets/cv.pdf',
            filename: 'aaron-paterson-cv.pdf',
          },
        }
      }

      if (subcommand === '--view-html') {
        return {
          success: true,
          output: 'Opening CV in new tab...',
          action: { type: 'openLink', url: '/cv.html' },
        }
      }

      return {
        success: false,
        output: '',
        error: `Invalid cv options. Use 'cv --help' for usage.`,
      }
    },
    aliases: ['curriculum'],
  },

  {
    name: 'contact',
    description: 'Show contact information',
    usage: 'contact --show',
    handler: (args) => {
      if (args[0] === '--show') {
        return {
          success: true,
          output: [
            '┌─ Contact Information ────────────────────────────────┐',
            '│                                                      │',
            `│  Email:   ${profile.email.padEnd(45)}│`,
            `│  Web:     ${profile.website.padEnd(45)}│`,
            `│  GitHub:  ${profile.github.padEnd(45)}│`,
            '│                                                      │',
            '└──────────────────────────────────────────────────────┘',
          ],
        }
      }

      return {
        success: true,
        output: 'Use: contact --show',
      }
    },
  },

  {
    name: 'portfolio',
    description: 'Portfolio and project information',
    usage: 'portfolio [--help]',
    handler: () => ({
      success: true,
      output: [
        'Portfolio',
        '',
        'GitHub:',
        '  More projects coming soon!',
        '',
        `  Visit: ${profile.github}`,
        '',
        'Check back soon for featured work.',
      ],
    }),
  },

  {
    name: 'whoami',
    description: 'Display current user information',
    usage: 'whoami',
    handler: () => ({
      success: true,
      output: [
        `${profile.name} <${profile.email}>`,
        profile.role,
        '',
        ...profile.bio,
      ],
    }),
  },

  {
    name: 'clear',
    description: 'Clear terminal output',
    usage: 'clear',
    handler: () => ({
      success: true,
      output: '',
      action: { type: 'clear' },
    }),
  },
]

export default commands
