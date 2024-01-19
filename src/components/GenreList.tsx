import {
	Button,
	HStack,
	Heading,
	Image,
	List,
	ListItem,
	Spinner,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";

function GenreList() {
	const genreId = useGameQueryStore((s) => s.gameQuery.genreId);
	const setGenreId = useGameQueryStore((s) => s.setGenreId);
	const { data, error, isLoading } = useGenres();

	if (error) return null;

	if (isLoading) return <Spinner />;

	return (
		<>
			<Heading fontSize="2xl" marginBottom={3}>
				Genres
			</Heading>
			<List padding={0}>
				{data?.results?.map((genre) => (
					<ListItem key={genre.id} paddingY="5px">
						<HStack>
							<Image
								boxSize="32px"
								objectFit="cover"
								borderRadius={8}
								src={getCroppedImageUrl(genre.image_background)}
							/>
							<Button
								variant="link"
								fontSize="lg"
								fontWeight={genre?.id === genreId ? "bold" : "normal"}
								onClick={() => setGenreId(genre.id)}
								whiteSpace="normal"
								textAlign="left"
							>
								{genre.name}
							</Button>
						</HStack>
					</ListItem>
				))}
			</List>
		</>
	);
}

export default GenreList;
