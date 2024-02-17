import { Card, Text, Group, ColorSwatch, Tooltip } from '@mantine/core';
// https://wonder-wardrobe.com/blog/5-color-outfit-matching-methods
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
                    The Monochrome Look:
                </Text>

                <Group>
                    {monochromeColorList(pickedColor).map(v =>
                        <Tooltip key={v.hsl} label={v.rgb}>
                            <ColorSwatch color={v.hsl} size={48}/>
                        </Tooltip>
                    )}
                </Group>

            </Card>
        </>
    )
}

export default ColorSuggestion
