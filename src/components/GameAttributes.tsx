import { SimpleGrid, Text } from "@chakra-ui/react";
import Game from "../entities/Game";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitonItem";

interface Props {
	game: Game;
}

const GameAttributes = ({ game }: Props) => {
	return (
		<SimpleGrid columns={2} as="dl">
			<DefinitionItem term="Platforms">
				{game.parent_platforms?.map(({ platform }) => (
					<Text key={platform.id} mb="0">
						{platform.name}
					</Text>
				))}
			</DefinitionItem>
			<DefinitionItem term="Metascore">
				<CriticScore score={game.metacritic} />
			</DefinitionItem>
			<DefinitionItem term="Genres">
				{game.genres.map((genre) => (
					<Text key={genre.id} mb="0">
						{genre.name}
					</Text>
				))}
			</DefinitionItem>
			<DefinitionItem term="Publishers">
				{game.publishers.map((publisher) => (
					<Text key={publisher.id} mb="0">
						{publisher.name}
					</Text>
				))}
			</DefinitionItem>
		</SimpleGrid>
	);
};

export default GameAttributes;
