import { Container, Group } from '@mantine/core';
import UploadForm from "../components/UploadForm";
import GoUrlBtn from '../components/GoUrlBtn';
import { IconBrandGithubFilled } from '@tabler/icons-react';

function HomePage() {
    return (
        <>

            <Group justify="flex-end" mt={16} mr={16}>
                <GoUrlBtn
                    title="Github"
                    url={"https://github.com/r48n34/QR-image-scanner-react"}
                    icon={<IconBrandGithubFilled size={16} />}
                />   
            </Group>
            
            <Container>
                <UploadForm />
            </Container>
        </>
    )
}

export default HomePage
