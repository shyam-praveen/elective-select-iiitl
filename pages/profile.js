import { Card, Avatar, Text, Button, Badge, Group, ActionIcon } from '@mantine/core'
import { useState } from 'react'

export default function Profile() {
  const [login, setLogin] = useState(false)

  return (
    <div
      style={{
        maxWidth: 320,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '3rem',
      }}
    >
      {!login ? (
        <Button onClick={() => setLogin(true)}>Login with google</Button>
      ) : (
        <div
          style={{
            maxWidth: 320,
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Button onClick={() => setLogin(false)}>Logout</Button>

          <Card withBorder radius="md">
            <Group position="apart">
              <Badge>lci2020043@iiitl.ac.in</Badge>
            </Group>

            <Text size="lg" weight={500} mt="md">
              Student Name
            </Text>
            <Text size="sm" color="dimmed" mt={5}>
              Branch of the student. <br />
              Instructions regarding elective selection.
            </Text>
          </Card>
        </div>
      )}
    </div>
  )
}
