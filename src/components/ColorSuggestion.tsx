import { Card, Text } from '@mantine/core';

type ColorSuggestionProps = {
    pickedColor: string; // rgb(24, 40, 50)
}

function ColorSuggestion({ pickedColor }: ColorSuggestionProps) {
    return (
        <>
            <Card shadow="sm" padding="md" radius="md" withBorder mb={12}>

                <Text w={500} fw={300} mb={8}>
                    Suggested color
                </Text>

                <Text w={500} fw={300} mb={8}>
                    { pickedColor }
                </Text>


            </Card>
        </>
    )
}

export default ColorSuggestion
