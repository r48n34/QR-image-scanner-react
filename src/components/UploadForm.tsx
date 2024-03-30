import { FileInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons-react';
import QRcodeData from './QRcodeData';
import CropImagesCheck from './CropImagesCheck';

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
            <Text ta="center" fz={36} fw={300}>
                QR scan
            </Text>

            <Text ta="center" mt={-8} fz={16} fw={200} c="dimmed">
                Your website serverless QR scan
            </Text>

            <form onSubmit={form.onSubmit((values) => console.log(values))}>

                <FileInput
                    placeholder="hello.png"
                    label="Image file"
                    withAsterisk
                    accept="image/png, image/jpg, image/jpeg"
                    leftSection={<IconUpload size={12} />}
                    {...form.getInputProps('file')}
                    mb={16}
                />

                {form.values.file
                    ? (<>
                        {/* <DisplayImageCard src={URL.createObjectURL(form.values.file)} /> */}
                        <QRcodeData title={"Original images QR found"} src={URL.createObjectURL(form.values.file)}/>
                        <CropImagesCheck src={URL.createObjectURL(form.values.file)}/>
                    </>)
                    : <></>
                }

            </form>
        </>
    )
}

export default UploadForm
