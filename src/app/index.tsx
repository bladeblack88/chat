import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Chat = {
  id: string;
  name: string;
  message: string;
  time: string;
  unread: number;
  color: string;
  initials: string;
  online?: boolean;
};

const CHATS: Chat[] = [
  { id: "1", name: "Алина", message: "Увидимся сегодня? ✨", time: "12:42", unread: 2, color: "#E9C7D8", initials: "А", online: true },
  { id: "2", name: "Команда", message: "Макс: отправил новые фото", time: "11:18", unread: 5, color: "#C9D9F5", initials: "К" },
  { id: "3", name: "Даня", message: "Ахах, точно 😂", time: "Вчера", unread: 0, color: "#D8D1F2", initials: "Д", online: true },
  { id: "4", name: "Мама ❤️", message: "Не забудь позвонить", time: "Вчера", unread: 0, color: "#F1D6B9", initials: "М" },
  { id: "5", name: "Саша", message: "Спасибо большое!", time: "Пн", unread: 0, color: "#C9E5D7", initials: "С" },
];

export default function ChatsScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"Все" | "Непрочитанные">("Все");

  const visibleChats = useMemo(() => CHATS.filter((chat) => {
    const matchesSearch = chat.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "Все" || chat.unread > 0;
    return matchesSearch && matchesFilter;
  }), [search, filter]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.eyebrow}>ТВОЁ ПРОСТРАНСТВО</Text>
            <Text style={styles.title}>Сообщения</Text>
          </View>
          <Pressable accessibilityLabel="Новое сообщение" style={styles.newButton}>
            <Ionicons name="create-outline" size={23} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={19} color="#8D8A98" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Поиск"
            placeholderTextColor="#9995A2"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.filters}>
          {(["Все", "Непрочитанные"] as const).map((item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[styles.filterPill, filter === item && styles.activeFilter]}
            >
              <Text style={[styles.filterText, filter === item && styles.activeFilterText]}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Недавние</Text>
          <Text style={styles.chatCount}>{visibleChats.length} чата</Text>
        </View>

        <FlatList
          data={visibleChats}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Ничего не найдено</Text>}
          renderItem={({ item }) => (
            <Pressable style={styles.chatRow}>
              <View style={[styles.avatar, { backgroundColor: item.color }]}>
                <Text style={styles.avatarText}>{item.initials}</Text>
                {item.online && <View style={styles.onlineDot} />}
              </View>
              <View style={styles.chatInfo}>
                <View style={styles.chatTopLine}>
                  <Text style={styles.chatName}>{item.name}</Text>
                  <Text style={styles.chatTime}>{item.time}</Text>
                </View>
                <View style={styles.chatBottomLine}>
                  <Text numberOfLines={1} style={styles.message}>{item.message}</Text>
                  {item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{item.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          )}
        />

        <View style={styles.bottomBar}>
          <View style={styles.tabActive}>
            <Ionicons name="chatbubbles" size={21} color="#6D55D9" />
            <Text style={styles.tabActiveText}>Чаты</Text>
          </View>
          <View style={styles.tab}>
            <Ionicons name="people-outline" size={21} color="#9692A0" />
            <Text style={styles.tabText}>Контакты</Text>
          </View>
          <View style={styles.tab}>
            <Ionicons name="settings-outline" size={21} color="#9692A0" />
            <Text style={styles.tabText}>Настройки</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8F7FB" },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 18 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  eyebrow: { color: "#9691A2", fontSize: 10, letterSpacing: 2, fontWeight: "700", marginBottom: 7 },
  title: { color: "#211D2B", fontSize: 31, fontWeight: "800", letterSpacing: -1 },
  newButton: { width: 47, height: 47, borderRadius: 17, backgroundColor: "#6D55D9", alignItems: "center", justifyContent: "center" },
  searchBox: { height: 51, borderRadius: 16, backgroundColor: "#EFEDF4", flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 10 },
  searchInput: { flex: 1, color: "#211D2B", fontSize: 15 },
  filters: { flexDirection: "row", gap: 9, marginTop: 18, marginBottom: 27 },
  filterPill: { paddingHorizontal: 17, paddingVertical: 10, borderRadius: 20, backgroundColor: "#EFEDF4" },
  activeFilter: { backgroundColor: "#6D55D9" },
  filterText: { color: "#777281", fontSize: 13, fontWeight: "600" },
  activeFilterText: { color: "#FFFFFF" },
  sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  sectionTitle: { color: "#282431", fontSize: 18, fontWeight: "800" },
  chatCount: { color: "#A09BA9", fontSize: 12 },
  list: { paddingBottom: 14 },
  chatRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14, gap: 13 },
  avatar: { width: 53, height: 53, borderRadius: 19, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#40364E", fontSize: 20, fontWeight: "700" },
  onlineDot: { position: "absolute", width: 12, height: 12, borderRadius: 6, backgroundColor: "#48C58B", right: -1, bottom: 0, borderWidth: 2, borderColor: "#F8F7FB" },
  chatInfo: { flex: 1, borderBottomWidth: 1, borderBottomColor: "#EFEDF2", paddingBottom: 15 },
  chatTopLine: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 7 },
  chatName: { color: "#292532", fontSize: 15, fontWeight: "700" },
  chatTime: { color: "#A09BA9", fontSize: 11 },
  chatBottomLine: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  message: { color: "#8D8996", fontSize: 13, flex: 1 },
  unreadBadge: { minWidth: 21, height: 21, borderRadius: 11, backgroundColor: "#6D55D9", alignItems: "center", justifyContent: "center", paddingHorizontal: 5 },
  unreadText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  empty: { textAlign: "center", color: "#9995A2", marginTop: 35 },
  bottomBar: { height: 76, borderTopWidth: 1, borderTopColor: "#EFEDF2", flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginHorizontal: -22, backgroundColor: "#F8F7FB" },
  tab: { alignItems: "center", gap: 4, minWidth: 78 },
  tabText: { color: "#9692A0", fontSize: 10, fontWeight: "600" },
  tabActive: { alignItems: "center", gap: 4, minWidth: 78 },
  tabActiveText: { color: "#6D55D9", fontSize: 10, fontWeight: "700" }
});