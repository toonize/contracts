import { Address } from "@lev-x/loom-x/dist";
import Chain from "@lev-x/loom-x/dist/chains/Chain";
import { Signer } from "ethers";
import { Provider, TransactionResponse } from "ethers/providers";
import { BigNumber } from "ethers/utils";

import ERC721Full from "./ERC721Full";

export default class LoomToonizeToken extends ERC721Full {
    public static at(chain: Chain) {
        return new LoomToonizeToken(
            require("../networks/LoomToonizeToken.json")[chain.network.chainId].address,
            chain.signer
        );
    }

    constructor(address: string, signerOrProvider: Signer | Provider) {
        super(address, require("../abis/LoomToonizeToken.json"), signerOrProvider);
    }

    public getAvatarsOf(account: Address, overrides = {}): Promise<string[]> {
        return this.functions.getAvatarsOf(account.toLocalAddressString(), overrides);
    }

    public getSelectedAvatarOf(tokenId: BigNumber, overrides = {}): Promise<string> {
        return this.functions.getSelectedAvatarOf(tokenId, overrides);
    }

    public selectAvatar(avatar: string, overrides = {}): Promise<TransactionResponse> {
        return this.functions.selectAvatar(avatar, overrides);
    }
}
