import { Address } from "@lev-x/loom-x/dist";
import { Contract } from "ethers";
import { TransactionResponse } from "ethers/providers";
import { BigNumber } from "ethers/utils";

export default class ERC721Full extends Contract {
    public balanceOf(owner: Address, overrides = {}): Promise<BigNumber> {
        return this.functions.balanceOf(owner.toLocalAddressString(), overrides);
    }

    public ownerOf(tokenId: BigNumber, overrides = {}): Promise<string> {
        return this.functions.ownerOf(tokenId, overrides);
    }

    public safeTransferFrom(
        from: Address,
        to: Address,
        tokenId: BigNumber,
        data: string | null = null,
        overrides = {}
    ): Promise<TransactionResponse> {
        return data
            ? this.functions.safeTransaferFrom(from.toLocalAddressString(), to.toLocalAddressString(), data, overrides)
            : this.functions.safeTransaferFrom(from.toLocalAddressString(), to.toLocalAddressString(), overrides);
    }

    public transferFrom(from: Address, to: Address, tokenId: BigNumber, overrides = {}): Promise<TransactionResponse> {
        return this.functions.transaferFrom(from.toLocalAddressString(), to.toLocalAddressString(), overrides);
    }

    public approve(to: Address, tokenId: BigNumber, overrides = {}): Promise<TransactionResponse> {
        return this.functions.approve(to.toLocalAddressString(), tokenId, overrides);
    }

    public getApproved(tokenId: BigNumber, overrides = {}): Promise<string> {
        return this.functions.getApproved(tokenId, overrides);
    }

    public setApprovalForAll(operator: Address, approved: boolean, overrides = {}): Promise<TransactionResponse> {
        return this.functions.setApprovalForAll(operator.toLocalAddressString(), approved, overrides);
    }

    public isApprovedForAll(owner: Address, operator: Address, overrides = {}): Promise<boolean> {
        return this.functions.isApprovedForAll(
            owner.toLocalAddressString(),
            operator.toLocalAddressString(),
            overrides
        );
    }

    public totalSupply(overrides = {}): Promise<BigNumber> {
        return this.functions.totalSupply(overrides);
    }

    public tokenOfOwnerByIndex(owner: Address, index: BigNumber, overrides = {}): Promise<BigNumber> {
        return this.functions.tokenOfOwnerByIndex(owner.toLocalAddressString(), index, overrides);
    }

    public tokenByIndex(index: BigNumber, overrides = {}): Promise<BigNumber> {
        return this.functions.tokenByIndex(index, overrides);
    }

    public name(overrides = {}): Promise<string> {
        return this.functions.name(overrides);
    }

    public symbol(overrides = {}): Promise<string> {
        return this.functions.symbol(overrides);
    }

    public tokenURI(tokenId: BigNumber, overrides = {}): Promise<string> {
        return this.functions.tokenURI(tokenId, overrides);
    }
}
