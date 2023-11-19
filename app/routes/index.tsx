import {
  Grid,
  GridItem,
  Flex,
  Box,
  Heading,
  VStack,
  Container,
  Image,
} from "@chakra-ui/react";
import { type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const response = await axios.get(`${process.env.API_URL}/anime`, {
    params: {
      page: 1,
      limit: 10,
      type: "tv",
      sort: "desc",
      start_date: '2021-01-01',
      end_date: '2023-10-31'
    },
  });

  return response.data;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <VStack>
      <Container maxW="container.sm" centerContent>
        <Flex mt={3}>
          <Box p="2">
            <Heading size="md">List Anime</Heading>
          </Box>
        </Flex>
        <Grid templateColumns={"repeat(4, 1fr)"} gap={5} mt={3}>
          {data.data.map((val: any, i: number) => (
            <GridItem key={i} w="100%">
              <Box
                maxW="md"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Image src={val.images.jpg.image_url} alt={`gambar-${i}`} />

                <Box p="6">
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                  >
                    {val.title}
                  </Box>
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </VStack>
  );
}
