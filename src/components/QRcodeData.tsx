import { Card, Text } from '@mantine/core';
import jsQR from 'jsqr';
import { useEffect, useState } from 'react';

function isValidHttpUrl(str: string) {
    let url;

    try {
        url = new URL(str);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

type QRcodeDataProps = {
    src: string;
}

function QRcodeData({ src }: QRcodeDataProps) {

    const [qrCodeData, setQrCodeData] = useState<string>("");

    async function imageDataFromSource(source: string) {
        const image = Object.assign(new Image(), { src: source });
        await new Promise(resolve => image.addEventListener('load', () => resolve(null)));

        const context = Object.assign(document.createElement('canvas'), {
            width: image.width,
            height: image.height
        }).getContext('2d') as CanvasRenderingContext2D;

        context.imageSmoothingEnabled = false;
        context.drawImage(image, 0, 0);

        return {
            data: context.getImageData(0, 0, image.width, image.height),
            width: image.width,
            height: image.height,
        }
    }

    useEffect(() => {
        (async () => {
            setQrCodeData("");

            if (src) {

                const imagesArray = await imageDataFromSource(src)
                const code = jsQR(imagesArray.data.data, imagesArray.width, imagesArray.height);

                if (code) {
                    console.log("Found QR code", code);
                    setQrCodeData(code.data)
                }

            }
        })()
    }, [src]);

    return (
        <>
            {qrCodeData !== "" && (
                <Card shadow="sm" padding="md" radius="md" withBorder mb={12}>

                    <Text w={500} fw={300} mb={8} fz={18}>
                        QR data
                    </Text>

                    <Text 
                        w={500} fw={300} mb={8}
                        component={isValidHttpUrl(qrCodeData) ? "a": "span"}
                        href={isValidHttpUrl(qrCodeData) ? qrCodeData: ""}
                        target="_blank"
                    >
                        {qrCodeData}
                    </Text>

                </Card>
            )}
        </>
    )
}

export default QRcodeData
