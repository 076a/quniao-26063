import ItemData from "@bundle:com.example.pageanddata/entry/ets/viewmodel/ItemData";
/**
 * Binds data to components and provides interfaces.
 */
export class MainViewModel {
    /**
     * Get swiper image data.
     *
     * @return {Array<Resource>} swiperImages.
     */
    getSwiperImages(): Array<Resource> {
        let swiperImages: Resource[] = [
            { "id": 16777414, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
            { "id": 16777420, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
            { "id": 16777300, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
            { "id": 16777383, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }
        ];
        return swiperImages;
    }
    /**
     * Get data of the first grid.
     *
     * @return {Array<PageResource>} firstGridData.
     */
    getFirstGridData(): Array<ItemData> {
        let firstGridData: ItemData[] = [
            new ItemData(0, { "id": 16777274, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777305, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(1, { "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(2, { "id": 16777269, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777301, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(3, { "id": 16777292, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777385, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(4, { "id": 16777273, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777412, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(5, { "id": 16777250, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777419, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(6, { "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777304, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            new ItemData(7, { "id": 16777280, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777382, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" })
        ];
        return firstGridData;
    }
    /**
     * Get data of the setting list.
     *
     * @return {Array<PageResource>} settingListData.
     */
    getSettingListData(): Array<Array<ItemData>> {
        let settingListData: ItemData[][] = [
            [
                new ItemData(0, { "id": 16777288, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777302, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777291, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" })
            ],
            [
                new ItemData(1, { "id": 16777286, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777407, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
                new ItemData(2, { "id": 16777287, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777417, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            ],
            [
                new ItemData(3, { "id": 16777241, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777380, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
                new ItemData(4, { "id": 16777289, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777384, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }),
            ],
            [
                new ItemData(5, { "id": 16777285, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" }, { "id": 16777306, "type": 20000, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" })
            ]
        ];
        return settingListData;
    }
}
export default new MainViewModel();
