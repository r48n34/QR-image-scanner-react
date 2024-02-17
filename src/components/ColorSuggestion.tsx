import { Card, Text, Group, ColorSwatch } from '@mantine/core';
// import { darken } from '@mantine/core';
import { monochromeColorList } from '../utils/colorChnage';

type ColorSuggestionProps = {
    pickedColor: string; // rgb(24, 40, 50)
}

function ColorSuggestion({ pickedColor }: ColorSuggestionProps) {
    return (
        <>
            <Card shadow="sm" padding="md" radius="md" withBorder mb={12}>

                <Text w={500} fw={300} mb={8} fz={18}>
                    Suggested match color
                </Text>

                <Text w={500} fw={300} mb={8}>
                    {pickedColor}
                </Text>

                <Text w={500} fw={300} mb={8}>
                    The Monochrome Look:
                </Text>

                <Group>
                    {monochromeColorList(pickedColor).map(v => <ColorSwatch color={v} size={48}/>)}
                </Group>



            </Card>
        </>
    )
}

export default ColorSuggestion
