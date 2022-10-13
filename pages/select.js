import { useForm } from '@mantine/form'
import { NumberInput, Button, Group, Select } from '@mantine/core'

export default function SelectElective() {
  const form = useForm({
    initialValues: {
      email: 'student@iiitl.ac.in',
      cgpa: '',
      elective: '',
    },
  })

  return (
    <div style={{ maxWidth: 320, margin: 'auto' }}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        {/* <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} /> */}
        <NumberInput
          required
          label="CGPA"
          defaultValue={0}
          precision={2}
          min={0}
          step={0.005}
          max={10}
          {...form.getInputProps('cgpa')}
        />

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
