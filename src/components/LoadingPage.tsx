import { Loader, Group } from "@mantine/core";

function LoadingPage(){
    return (
        <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
            <div>
            <Group justify="center" mt={12}>
                <Loader color="blue" type="bars" size="lg"/>
            </Group>
            </div>
        </div>
    )
}
    
export default LoadingPage
