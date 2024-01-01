import {
	Button,
	HStack,
	Heading,
	Image,
	List,
	ListItem,
	Spinner,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
	selectedGenre: Genre | null;
	onSelectGenre: (genre: Genre) => void;
}

function GenreList({ selectedGenre, onSelectGenre }: Props) {
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
								fontWeight={genre?.id === selectedGenre?.id ? "bold" : "normal"}
								onClick={() => onSelectGenre(genre)}
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
