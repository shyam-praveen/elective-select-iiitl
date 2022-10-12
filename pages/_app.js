import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'

import { AppHeader } from '../components/app-header'

function MyApp({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  function toggleColorScheme(value) {
    return setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <AppHeader
            links={[
              { link: '/', label: 'Home' },
              { link: '/profile', label: 'Profile' },
              { link: '/edit', label: 'Edit' },
              { link: '/share', label: 'Share' },
              { link: '/retrieve', label: 'Retrieve' },
              { link: '/access', label: 'Access' },
              { link: '/marketplace', label: 'Marketplace' },
            ]}
          />
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default MyApp
