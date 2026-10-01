import { useEffect } from 'react'
import { ToolLayout } from '../components/common/ToolLayout'
import { setMetaTags } from '../utils/meta'

export const RegexTester = () => {
  useEffect(() => {
    setMetaTags({
      title: 'Regex Tester & Debugger | Softaro DevTools',
      description: 'Test and debug regular expressions with match highlighting. View capture groups and match positions.',
      keywords: 'regex tester, regex debugger, test regex, regular expression tester, regex tool',
      ogTitle: 'Regex Tester & Debugger',
      ogDescription: 'Test and debug regular expressions with match highlighting',
      ogType: 'website',
      ogUrl: 'https://tools.softarolabs.com/regex-tester',
      twitterTitle: 'Regex Tester & Debugger',
      twitterDescription: 'Test regex patterns instantly',
    })
  }, [])

  return (
    <ToolLayout 
      title="Regex Tester"
      description="Test and debug regular expressions with match highlighting"
    >
      <p>Coming soon...</p>
    </ToolLayout>
  )
}
