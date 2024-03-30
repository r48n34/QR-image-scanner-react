import { Card, Group, Text, Textarea } from '@mantine/core';
import { useEffect, useState } from 'react';
import { imageSrcToQR } from '../utils/qrUtils';
import { notifications } from '@mantine/notifications';
import CopyTextBtn from './CopyTextBtn';

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
    src: string
    title: string
}

function QRcodeData({ src, title = "QR data" }: QRcodeDataProps) {

    const [qrCodeData, setQrCodeData] = useState<string>("");

    useEffect(() => {
        (async () => {
            setQrCodeData("");

            if (src) {
                const imagesArray = await imageSrcToQR(src)

                if (imagesArray) {
                    setQrCodeData(imagesArray)

                    if(title === "Original images QR found"){
                        notifications.show({
                            title: 'Global QR found',
                            message: 'A valid QR code has found on your image',
                        })
                    }
                }
            }
        })()
    }, [src]);

    return (
        <>
            {qrCodeData !== "" && (
                <Card shadow="sm" padding="md" radius="md" withBorder mb={12}>

                    <Text w={500} fw={300} mb={8} fz={18}>
                       { title }
                    </Text>

                    <Text 
                        w={500} fw={300} mb={8}
                        component={isValidHttpUrl(qrCodeData) ? "a": "span"}
                        href={isValidHttpUrl(qrCodeData) ? qrCodeData: ""}
                        target="_blank"
                    >
                        {qrCodeData}
                    </Text>

                    <Textarea
                        label="Raw data"
                        value={qrCodeData}
                    />

                    <Group justify='flex-end' mt={12}>
                        <CopyTextBtn data={qrCodeData} />
                    </Group>

                </Card>
            )}
        </>
    )
}

export default QRcodeData
