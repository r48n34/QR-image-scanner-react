import { FileInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import { IconUpload } from '@tabler/icons-react';
import DisplayImageCard from './DisplayImageCard';

interface FormObject {
    file: File | null
}

function UploadForm() {

    const form = useForm<FormObject>({
        initialValues: {
            file: null,
        },
        validate: {
            file: (value) => (
                !value
                    ? 'Missing png file'
                    : value.size / 1024 / 1024 >= 100 // in MiB 
                        ? 'png file too big'
                        : null
            ),
        },
    });


    return (
        <>
        <Text ta="center" mt={24} fz={36} fw={300}>
            Color matcher
        </Text>

        <Text ta="center" mt={-8} fz={16} fw={200} c="dimmed">
            Your best color cloth matcher
        </Text>

        <form onSubmit={form.onSubmit((values) => console.log(values))}>

            <FileInput
                placeholder="hello.png"
                label="Png file"
                withAsterisk
                accept="image/png, image/jpg, image/jpeg"
                leftSection={<IconUpload size={12} />}
                {...form.getInputProps('file')}
                mb={16}
            />

            {form.values.file
                ? <DisplayImageCard src={URL.createObjectURL(form.values.file)} />
                : <></>
            }

        </form>
        </>
    )
}

export default UploadForm
