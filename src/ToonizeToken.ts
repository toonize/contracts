import { Address } from "@lev-x/loom-x/dist";
import Chain from "@lev-x/loom-x/dist/chains/Chain";
import { ethers } from "ethers";

export interface Avatar {
    description: string;
    options: Options;
    items: Items;
}

export interface Options {
    face: "short" | "medium" | "long";
    eyes: "small" | "medium" | "big";
    betweenEyes: "narrow" | "medium" | "wide";
    mouth: "small" | "medium" | "big";
    body: "slim" | "default" | "chubby";
}

export interface Items {
    face: Item;
    hair: Item;
    eyebrows: Item;
    eyes: Item;
    nose: Item;
    mouth: Item;
    clothes: Item;
    body: Item;
    background: Item;
    outwear?: Item;
    hat?: Item;
    glasses?: Item;
    accessory?: Item;
    expression?: Item;
    hand?: Item;
    balloon?: Item;
    pet?: Item;
    goods?: Item;
}

export interface Item {
    key: string;
    color?: string;
}

export default class ToonizeToken extends ethers.Contract {
    public static at(chain: Chain) {
        return new ToonizeToken(
            require("../networks/AvatarRegistry.json")[chain.network.chainId].address,
            chain.signer
        );
    }

    constructor(address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider) {
        super(address, require("../abis/AvatarRegistry.json"), signerOrProvider);
    }

    public getAvatarsOf(account: Address, overrides = {}): Promise<Avatar[]> {
        return this.functions.getAvatarsOf(account.toLocalAddressString(), overrides);
    }

    public addAvatar(to: Address, avatar: Avatar, overrides = {}): Promise<ethers.providers.TransactionResponse> {
        return this.functions.addAvatar(to.toLocalAddressString(), avatar, overrides);
    }
}