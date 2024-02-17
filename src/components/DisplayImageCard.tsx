import { Card, Text, ColorSwatch, Group } from '@mantine/core';
import { useState } from 'react';
import { ImageColorPicker } from 'react-image-color-picker';

type DisplayCardProps = {
    src: string;
}

function DisplayImageCard({ src }: DisplayCardProps){

    const [ pickedColor, setPickedColor ] = useState<string>("");

    return (
        <>
        <Card shadow="sm" padding="md" radius="md" withBorder mb={12}>
        
            <Text w={500} fw={300} mb={8}>
                Preview
            </Text>
   
            <ImageColorPicker
                onColorPick={setPickedColor}
                imgSrc={src}
                zoom={3}
            />

            { pickedColor && 
                <Group justify='flex-end' mb={8} mt={16}>
                    <Text fw={300}  ta="right">
                        { pickedColor } 
                    </Text>
                    <ColorSwatch color={ pickedColor } />
                </Group>
            }

        </Card>
        </>
    )
}
    
export default DisplayImageCard
