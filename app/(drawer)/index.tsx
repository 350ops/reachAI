import Header from '@/components/Header';
import React from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import DrawerButton from '@/components/DrawerButton';
import { ChatInput } from '@/components/ChatInput';
import { BotSwitch } from '@/components/BotSwitch';
import { LinearGradient } from 'expo-linear-gradient';
import { shadowPresets } from '@/utils/useShadow';
import useThemeColors from '../contexts/ThemeColors';


const quickActions = [
    { label: 'Ask anything', description: 'Chat, plan, and summarise in seconds', icon: 'Sparkles' as const },
    { label: 'Voice ready', description: 'Tap to dictate while on the go', icon: 'Mic' as const },
    { label: 'Generate', description: 'Images, copy, and ideas on demand', icon: 'Wand2' as const },
    { label: 'Search web', description: 'Pull in the latest info', icon: 'Search' as const },
];

const promptCards = [
    {
        title: 'Turn notes into tasks',
        description: 'Paste your meeting notes and get an action list ready to check off.',
        icon: 'ClipboardList' as const,
    },
    {
        title: 'Visual inspiration',
        description: 'Describe a vibe or product idea and let Luna sketch the first concept.',
        icon: 'Image' as const,
    },
    {
        title: 'Travel-friendly',
        description: 'Ask for nearby suggestions or quick directions while you move.',
        icon: 'MapPin' as const,
    },
];

const HomeScreen = () => {
    const colors = useThemeColors();
    const { width } = useWindowDimensions();
    const isCompact = width < 420;

    const rightComponents = [
        <BotSwitch key="bot-switch" />
    ];

    const leftComponent = [
        <DrawerButton key="drawer-button" />,
        <ThemedText key="app-title" className='text-2xl font-outfit-bold ml-4'>Luna<Text className="text-highlight">.</Text></ThemedText>
    ];

    return (
        <View className="flex-1 bg-light-primary dark:bg-dark-primary relative">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1 }}>
                    <Header
                        title=""
                        leftComponent={leftComponent}
                        rightComponents={rightComponents} />

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 140 }}
                        className="flex-1"
                    >
                        <View className="px-global space-y-5 pt-2">
                            <LinearGradient
                                colors={colors.isDark ? ['#0F172A', '#111827', '#0B132B'] : ['#D2E9FF', '#E8E5FF', '#E0F7FF']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ ...shadowPresets.large }}
                                className="rounded-3xl p-5 overflow-hidden"
                            >
                                <View className="flex-row items-center">
                                    <View className="flex-1 space-y-2">
                                        <ThemedText className="text-xs uppercase tracking-[2px] text-highlight opacity-80">Mobile ready</ThemedText>
                                        <ThemedText className="text-2xl font-outfit-bold">Your on-the-go AI copilot</ThemedText>
                                        <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">Quick access to prompts, voice mode, and saved flows designed for smaller screens.</ThemedText>
                                        <View className="flex-row mt-1">
                                            <Pill text="Live voice" />
                                            <Pill text="Multi-modal" />
                                        </View>
                                    </View>

                                    <VoiceOrb compact={isCompact} />
                                </View>

                                <View className="flex-row mt-4 space-x-3">
                                    <HighlightStat icon="Clock3" label="Response time" value="~1.2s" />
                                    <HighlightStat icon="Shield" label="Private" value="Encrypted" />
                                </View>
                            </LinearGradient>

                            <View className="space-y-3">
                                <View className="flex-row justify-between items-center">
                                    <ThemedText className="text-lg font-outfit-bold">Quick actions</ThemedText>
                                    <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">Optimized for one-hand use</ThemedText>
                                </View>

                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ columnGap: 12, paddingRight: 12 }}
                                    className="-mx-global px-global"
                                >
                                    {quickActions.map((action) => (
                                        <ActionCard key={action.label} {...action} />
                                    ))}
                                </ScrollView>
                            </View>

                            <View className="space-y-3">
                                <ThemedText className="text-lg font-outfit-bold">Suggested mobile prompts</ThemedText>
                                <View className="space-y-3">
                                    {promptCards.map((card) => (
                                        <PromptCard key={card.title} {...card} />
                                    ))}
                                </View>
                            </View>

                            <View className="space-y-3 mb-2">
                                <ThemedText className="text-lg font-outfit-bold">Stay organized</ThemedText>
                                <View className="flex-row flex-wrap gap-3">
                                    <SmallTile icon="Bookmark" title="Saved replies" description="Reuse answers instantly." />
                                    <SmallTile icon="Bell" title="Smart alerts" description="Get notified when Luna finishes." />
                                    <SmallTile icon="Sparkle" title="Tone control" description="Switch between casual or formal." />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <ChatInput />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const VoiceOrb = ({ compact }: { compact: boolean }) => {
    const size = compact ? 120 : 140;
    const inner = compact ? 90 : 105;

    return (
        <LinearGradient
            colors={['#0EA5E9', '#6366F1', '#E879F9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ ...shadowPresets.medium }}
            className="rounded-full items-center justify-center ml-3"
        >
            <View style={{ width: size, height: size }} className="items-center justify-center">
                <View className="rounded-full bg-light-secondary/80 dark:bg-dark-primary/90 items-center justify-center" style={{ width: inner, height: inner }}>
                    <Icon name="Mic" size={compact ? 28 : 32} />
                </View>
            </View>
        </LinearGradient>
    );
};

const Pill = ({ text }: { text: string }) => (
    <View className="bg-white/70 dark:bg-white/10 px-3 py-1 rounded-full mr-2">
        <ThemedText className="text-xs font-semibold">{text}</ThemedText>
    </View>
);

const HighlightStat = ({ icon, label, value }: { icon: Parameters<typeof Icon>[0]['name']; label: string; value: string; }) => (
    <View style={shadowPresets.small} className="flex-1 bg-light-secondary/70 dark:bg-dark-secondary/70 rounded-2xl p-3 flex-row items-center">
        <View className="w-9 h-9 rounded-full bg-light-primary dark:bg-dark-primary items-center justify-center mr-3">
            <Icon name={icon} size={18} />
        </View>
        <View className="flex-1">
            <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">{label}</ThemedText>
            <ThemedText className="text-sm font-semibold">{value}</ThemedText>
        </View>
    </View>
);

const ActionCard = ({ label, description, icon }: { label: string; description: string; icon: Parameters<typeof Icon>[0]['name']; }) => (
    <Pressable
        style={shadowPresets.card}
        className="w-[220px] bg-light-secondary dark:bg-dark-secondary rounded-2xl p-4"
    >
        <View className="flex-row items-center justify-between mb-3">
            <View className="w-10 h-10 rounded-full bg-light-primary dark:bg-dark-primary items-center justify-center">
                <Icon name={icon} size={18} />
            </View>
            <Icon name="ChevronRight" size={18} />
        </View>
        <ThemedText className="text-base font-semibold mb-1">{label}</ThemedText>
        <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">{description}</ThemedText>
    </Pressable>
);

const PromptCard = ({ title, description, icon }: { title: string; description: string; icon: Parameters<typeof Icon>[0]['name']; }) => (
    <Pressable
        style={shadowPresets.card}
        className="bg-light-secondary dark:bg-dark-secondary rounded-2xl p-4 flex-row"
    >
        <View className="w-11 h-11 rounded-2xl bg-light-primary dark:bg-dark-primary items-center justify-center mr-3">
            <Icon name={icon} size={18} />
        </View>
        <View className="flex-1">
            <ThemedText className="text-base font-semibold mb-1">{title}</ThemedText>
            <ThemedText className="text-sm text-light-subtext dark:text-dark-subtext">{description}</ThemedText>
        </View>
    </Pressable>
);

const SmallTile = ({ icon, title, description }: { icon: Parameters<typeof Icon>[0]['name']; title: string; description: string; }) => (
    <View style={shadowPresets.card} className="bg-light-secondary dark:bg-dark-secondary rounded-2xl p-3 w-[170px] flex-row items-start">
        <View className="w-9 h-9 rounded-full bg-light-primary dark:bg-dark-primary items-center justify-center mr-3">
            <Icon name={icon} size={16} />
        </View>
        <View className="flex-1">
            <ThemedText className="text-sm font-semibold mb-1">{title}</ThemedText>
            <ThemedText className="text-xs text-light-subtext dark:text-dark-subtext">{description}</ThemedText>
        </View>
    </View>
);

export default HomeScreen;
