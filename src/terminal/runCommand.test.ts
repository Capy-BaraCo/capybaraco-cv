import { describe, it, expect } from 'vitest'
import { parseInput, runCommand } from './runCommand'
import { profile } from '../data/profile'

describe('parseInput', () => {
  it('splits a command and its args on whitespace', () => {
    expect(parseInput('cv --view-html')).toEqual({
      command: 'cv',
      args: ['--view-html'],
    })
  })

  it('lowercases the command name', () => {
    expect(parseInput('WhoAmI').command).toBe('whoami')
  })

  it('collapses repeated whitespace', () => {
    expect(parseInput('  cv    --download-pdf  ')).toEqual({
      command: 'cv',
      args: ['--download-pdf'],
    })
  })
})

describe('runCommand', () => {
  it('returns an error for an unknown command', async () => {
    const result = await runCommand('definitely-not-a-command')
    expect(result.success).toBe(false)
    expect(result.error).toMatch(/command not found/)
  })

  it('resolves aliases (? -> help)', async () => {
    const result = await runCommand('?')
    expect(result.success).toBe(true)
    expect(Array.isArray(result.output)).toBe(true)
  })

  it('describes a download action for cv --download-pdf', async () => {
    const result = await runCommand('cv --download-pdf')
    expect(result.success).toBe(true)
    expect(result.action).toEqual({
      type: 'download',
      url: '/assets/cv.pdf',
      filename: 'aaron-paterson-cv.pdf',
    })
  })

  it('describes an openLink action for cv --view-html', async () => {
    const result = await runCommand('cv --view-html')
    expect(result.action).toEqual({ type: 'openLink', url: '/cv.html' })
  })

  it('rejects the old space-separated cv syntax', async () => {
    const result = await runCommand('cv --download pdf')
    expect(result.success).toBe(false)
  })

  it('surfaces identity via whoami', async () => {
    const result = await runCommand('whoami')
    const text = (result.output as string[]).join('\n')
    expect(text).toContain(profile.name)
    expect(text).toContain(profile.role)
  })

  it('requests a clear action', async () => {
    const result = await runCommand('clear')
    expect(result.action).toEqual({ type: 'clear' })
  })

  it('treats blank input as unhandled (no error text)', async () => {
    const result = await runCommand('   ')
    expect(result.success).toBe(false)
    expect(result.error).toBe('')
  })
})
