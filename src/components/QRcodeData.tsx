import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { Accordion, Card, Group, Text, Textarea } from '@mantine/core';
import QRCode from "react-qr-code";
import { imageSrcToQR } from '../utils/qrUtils';
import CopyTextBtn from './CopyTextBtn';

function isValidHttpUrl(str: string) {
    try {
        let url = new URL(str);
        return url.protocol === "http:" || url.protocol === "https:";
    }
    catch (_) {
        return false;
    }
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

                    if (title === "Original images QR found") {
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
                        {title}
                    </Text>

                    <Text
                        w={500} fw={300} mb={8}
                        component={isValidHttpUrl(qrCodeData) ? "a" : "span"}
                        href={isValidHttpUrl(qrCodeData) ? qrCodeData : ""}
                        target="_blank"
                    >
                        {qrCodeData}
                    </Text>

                    <Accordion defaultValue="Apples">
                        <Accordion.Item key={"Raw data"} value={"Raw data"}>
                            <Accordion.Control>
                                Raw data
                            </Accordion.Control>

                            <Accordion.Panel>
                                <Textarea
                                    label="Raw data"
                                    value={qrCodeData}
                                />

                                <Group justify='flex-end' mt={12}>
                                    <CopyTextBtn data={qrCodeData} />
                                </Group>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item key={"QR"} value={"QR"}>
                            <Accordion.Control>
                                Re-generated QR Code
                            </Accordion.Control>

                            <Accordion.Panel>
                                <QRCode value={qrCodeData} />
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                    
                </Card>
            )}
        </>
    )
}

export default QRcodeData
