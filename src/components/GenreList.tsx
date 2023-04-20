import {
	Button,
	HStack,
	Image,
	List,
	ListItem,
	Spinner,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
	onSelectGenre: (genre: Genre) => void;
}

function GenreList({ onSelectGenre }: Props) {
	const { data, error, isLoading } = useGenres();

	if (error) return null;
	if (isLoading) return <Spinner />;

	return (
		<List padding={0}>
			{data.map((genre) => (
				<ListItem key={genre.id} paddingY="5px">
					<HStack>
						<Image
							boxSize="32px"
							borderRadius={8}
							src={getCroppedImageUrl(genre.image_background)}
						/>
						<Button
							variant="link"
							fontSize="lg"
							onClick={() => onSelectGenre(genre)}
						>
							{genre.name}
						</Button>
					</HStack>
				</ListItem>
			))}
		</List>
	);
}

export default GenreList;