import { getAllCustomer } from "@/api/customer";
import { useDebounceCallback } from "@/utils/useDebounceCallback";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FlatList, Pressable, Text, View } from "react-native";
import CustomerSkeleton from "../customer/skeleton/customer-skeleton";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";
import { Box } from "../ui/box";
import { SearchIcon } from "../ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "../ui/input";
import { transactionSchemaType } from "./schema";

export default function SelectCustomer({
  onSelected,
}: {
  onSelected: () => void;
}) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<transactionSchemaType>();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const updateSearch = useDebounceCallback((text: string) => {
    setSearch(text.trim());
  }, 400);

  const { data, isPending, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["customers", { search }],
    queryFn: () => getAllCustomer(1, 20, search),
  });

  return (
    <Box className="mt-8 gap-2 ">
      <Input className="w-full h-12 rounded-2xl">
        <InputSlot>
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            updateSearch(text);
          }}
          placeholder="Search name or phone"
        />
      </Input>

      {isPending ? (
        <CustomerSkeleton />
      ) : isError ? (
        <View className="items-center gap-3 py-8">
          <Text className="text-center text-gray-600">
            {error?.message ?? "Couldn't load customers"}
          </Text>
          <Pressable
            onPress={() => refetch()}
            className="rounded-full bg-[#5f33e1] px-5 py-2"
          >
            <Text className="font-semibold text-white">Try again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={data?.data}
          keyExtractor={(c) => c.id}
          style={{ maxHeight: 600 }}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => <View className="h-2" />}
          ListEmptyComponent={
            <Text className="py-8 text-center text-gray-500">
              {search ? `No customer matches "${search}"` : "No customers yet"}
            </Text>
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setValue("customer", item, {
                  shouldValidate: true,
                });
                onSelected();
              }}
              className="flex-row items-center gap-3 rounded-2xl bg-white p-3 active:opacity-70"
            >
              <Avatar>
                <AvatarFallbackText>Jane Doe is test</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                  }}
                />
              </Avatar>
              <View className="flex-1">
                <Text className="text-base font-semibold text-black">
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-500">{item.phone}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </Box>
  );
}
