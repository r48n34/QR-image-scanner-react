import { Card, Text, ColorSwatch, Group, Select, Space } from '@mantine/core';
import { useState } from 'react';
import { ImageColorPicker } from 'react-image-color-picker';
import ColorSuggestion from './ColorSuggestion';

type DisplayCardProps = {
    src: string;
}

function DisplayImageCard({ src }: DisplayCardProps){

    const [ pickedColor, setPickedColor ] = useState<string>("");

    return (
        <>
        <Card shadow="sm" padding="md" radius="md" withBorder mb={12}>
        
            <Text w={500} fw={300} mb={8} fz={18}>
                Preview
            </Text>
   
            <ImageColorPicker
                onColorPick={setPickedColor}
                imgSrc={src}
                zoom={3}
            />

            { pickedColor &&
                <>
                <Group justify='flex-end' mb={8} mt={16}>
                    <Text fw={300}  ta="right">
                        { pickedColor } 
                    </Text>
                    <ColorSwatch color={ pickedColor } />
                </Group>
                </>
            }

        </Card>

        { pickedColor && 
            <>
            <Select
                mb={18}
                label="What is that item?"
                placeholder="Pick a item"
                data={['Shirt', 'Pants', 'Jackets',]}
                defaultValue={'Shirt'}
            />
            </>
        }

        { pickedColor && 
            <>
            <ColorSuggestion pickedColor={pickedColor} />
            <Space h="lg"/>
            </>
        }
        </>
    )
}
    
export default DisplayImageCard
