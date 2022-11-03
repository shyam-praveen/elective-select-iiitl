import React from 'react'
import { Card, Text, Badge, Group } from '@mantine/core'
import { createStyles } from '@mantine/core'

const useStyles = createStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
}))

export default function UserProfile({ user }) {
  const { email, name } = user
  const { classes } = useStyles()

  return (
    <div>
      <Card withBorder radius="md" className={classes.wrapper}>
        <Group position="apart">
          <Badge>{email}</Badge>
        </Group>

        <Text size="lg" weight={500} mt="md">
          {name}
        </Text>
        <Text size="sm" color="dimmed" mt={5}>
          Branch of the student. <br />
          Instructions regarding elective selection.
        </Text>
      </Card>
    </div>
  )
}
