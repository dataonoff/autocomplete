export interface IListBoxProps {
    suggestiontype: string;
    usersMention: IUserMention[];
    channelsMention: IChannelMention[];
    searchedMention: string;
    setSelectedMention: React.Dispatch<React.SetStateAction<ISelectedMentionProps>>;
    cursor: number;
    setCursor: React.Dispatch<React.SetStateAction<number>>;
};

export interface ISelectedMentionProps {
    suggestiontype: string;
    name: string;
    id: string;
};

export interface IUserMention {
    id: string;
    username: string;
    discriminator: string;
};

export interface IChannelMention {
    id: string;
    name: string;
};

export interface IAutocompleteRow {
    name: string;
    suggestiontype: string;
    discriminator?: string;
    id: string;
    index: number;
    setSelectedMention: React.Dispatch<React.SetStateAction<ISelectedMentionProps>>;
    cursor: number;
    setCursor: React.Dispatch<React.SetStateAction<number>>;
};