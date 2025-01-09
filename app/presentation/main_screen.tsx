import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useListPokemon } from "../hooks/list_pokemon_hooks"
import "../util/string_extension.d"

const styles = StyleSheet.create({
    image: {
      width: 66,
      height: 66,
      marginHorizontal: 16,
      marginVertical: 8
    },
    view: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        marginVertical: 8
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 16,
      },
      text: {
        textAlignVertical: 'center',
        fontSize: 16,
        fontWeight: 'bold'
      }
  });

const ItemPokemon = ({name, url}: Pokemon) => {
    return (
        <View style={styles.view}>
            <Image style={styles.image} source={{uri: url.getPokemonImage()}}/>
            <Text style={styles.text}> {name.uppercaseFirst()} </Text>
        </View>
    )
}

const ListPokemon = () => {
    const {listPokemon, loading, error, loadMore, loadingMore} = useListPokemon();

    const renderFooter = () => {
        if (loadingMore) {
            return <ActivityIndicator size={"large"} color="#0000ff"/>
        } else {
            return null
        }
    }

    if (loading) {
        return <ActivityIndicator size={"large"} color="#0000ff"/>
    }

    if (error) {
        return (
            <View >
                <Text>Error {error}</Text>
            </View>
        )
    }

    return (
        <FlatList
                style={styles.sectionContainer}
                key={"13"}
                keyExtractor={(item) => item.url}
                data={listPokemon}
                renderItem={({item}) => <ItemPokemon name={item.name} url={item.url}/>}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
    )
}

export function MainScreen() {
    return (
        <SafeAreaView>
            <ListPokemon/>
        </SafeAreaView>
    )
}