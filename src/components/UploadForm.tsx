import { FileInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
// import jsQR from "jsqr";

import { IconUpload } from '@tabler/icons-react';
// import DisplayImageCard from './DisplayImageCard';
// import { useEffect } from 'react';
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

    // async function imageDataFromSource(source: string) {
    //     const image = Object.assign(new Image(), { src: source });
    //     await new Promise(resolve => image.addEventListener('load', () => resolve(null)));
        
    //     const context = Object.assign(document.createElement('canvas'), {
    //         width: image.width,
    //         height: image.height
    //     }).getContext('2d') as CanvasRenderingContext2D;

    //     context.imageSmoothingEnabled = false;
    //     context.drawImage(image, 0, 0);

    //     return {
    //         data: context.getImageData(0, 0, image.width, image.height),
    //         width: image.width,
    //         height: image.height,
    //     }
    // }

    // useEffect(() => {
    //     (async () => {
    //         if (form.values.file) {
    
    //             const imagesArray = await imageDataFromSource(URL.createObjectURL(form.values.file))
    //             const code = jsQR(imagesArray.data.data, imagesArray.width, imagesArray.height);
    
    //             if (code) {
    //                 console.log("Found QR code", code);
    //             }
    
    //         }
    //     })()
    // }, [form.values.file]);


    return (
        <>
            <Text ta="center" mt={24} fz={36} fw={300}>
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
