import { useForm } from '@mantine/form'
import { TextInput, Button, Group, Select } from '@mantine/core'

export default function SelectElective() {
  const form = useForm({
    initialValues: {
      email: '',
      elective: '',
    },
  })

  return (
    <div style={{ maxWidth: 320, margin: 'auto' }}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        {/* <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} /> */}
        <Select
          required
          style={{ marginTop: 20, zIndex: 2 }}
          data={['Course 1', 'Course 2']}
          placeholder="Elective"
          label="Select your preffered elective"
          {...form.getInputProps('elective')}
        />

        <Group position="center" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  )
}
