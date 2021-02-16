<template>
  <header>
    <Add class="add"></Add>
    <Sreach :selectinput="selectinput" @Getsreach="Getsreach"></Sreach>
  </header>
  <ELTable
    :loading="loading"
    :table-data="tableData"
    :table-label="tableLabel"
    :table-option="tableOption"
    @handleButton="handleButton"
    @handleSortChange="handleSortChange"
    @handleSelectionChange="handleSelectionChange"
  ></ELTable>
  <footer>
    <Pagination
      :total="total"
      v-model:currentPage="currentPage"
      @changeinfo="changeinfo"
    ></Pagination>
  </footer>
  <Editor ref="editorDom" :editorData="editorData" currentPage=""></Editor>
</template>

<script lang="ts">
/**
 * @name 管理用户
 * */
import { defineComponent, reactive, ref, computed, onMounted, ComputedRef } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import Sreach from "@/components/sreach.vue";
import ELTable from "@/components/table/table.vue";
import Pagination from "@/components/pagination/pagination.vue";
import Editor from "./editor.vue";
import Add from "./add.vue";
import { useStore } from "vuex";
import { GET_ADMIN_LIST, PAGE_INFO } from "@/store/modules/admin/type";
import { SetStatus } from "@/utils/api";
interface costomerData {
  tableData: any;
  loading: boolean;
  tableLabel: any;
  tableOption: object;
  selectinput: any;
  handleButton: (data: any) => void;
  handleSortChange: () => void;
  handleSelectionChange: () => void;
  editorDom: any;
  editorData: object;
  currentPage: number;
  pageinfo: any;
  changeinfo: (value: number) => void;
  total: any;
  Getsreach: (value: string) => void;
}
export default defineComponent({
  components: {
    ELTable,
    Sreach,
    Pagination,
    Add,
    Editor,
  },
  setup(): costomerData {
    const store = useStore();
    const pageinfo = computed(() => store.state.admin.pageinfo);
    const tableData = computed(() => store.state.admin.datalist);
    const total = computed<number>(() => store.state.admin.total);
    const editorDom: any = ref<HTMLElement | null>(null);
    const editorData: object = reactive({});
    const currentPage = ref<number>(1);
    const tableLabel = reactive([
      {
        label: "用户名",
        param: "username",
        align: "center",
        show: true,
      },
      {
        label: "状态",
        param: "status",
        align: "center",
        width: "200",
        show: true,
        render: (row: any) => {
          if (row.status === 0) {
            return "停用";
          } else if (row.status === 1) {
            return "开启";
          } else {
            return "未知";
          }
        },
      },
      {
        label: "注册时间",
        param: "created_data",
        lign: "center",
        show: true,
      },
      {
        label: "更新时间",
        param: "updata_data",
        lign: "center",
        show: true,
      },
      {
        label: "角色",
        param: "level_id",
        align: "center",
        show: true,
        render: (row: any) => {
          if (row.level_id === 1) {
            return "超级管理员";
          } else if (row.level_id === 2) {
            return "普通管理员";
          } else {
            return "未知";
          }
        },
      },
    ]);
    // 加载提示
    const loading = ref<boolean>(false);
    const tableOption = reactive({
      label: "操作",
      width: "200",
      options: [
        {
          label: "编辑",
          type: "primary",
          icon: "el-icon-edit",
          methods: "editorFn",
        },
        {
          label: "审核",
          type: "primary",
          icon: "el-icon-upload2",
          methods: "audit",
        },
      ],
    });

    const selectinput = reactive([
      {
        label: "用户名称",
        value: "user",
      },
      // {
      //   label: "手机号码",
      //   value: "phone",
      // },
    ]);

    const handleButton = (data: any) => {
      switch (data.methods) {
        case "editorFn":
          editorFn(data.row);
          break;
        case "audit":
          audit(data.row);
          console.log("audit");
          break;
      }
    };
    // 编辑
    const editorFn = (row: any) => {
      editorDom.value.addFn();
      (editorData as any).value = row;
      console.log(row); // 获取到编辑的一行数据
    };
    // 审核
    const audit = (row: any) => {
      console.log(row.status);
      let info = row.status === 1 ? "关闭账号操作？" : "进行开启账号操作？";
      ElMessageBox.confirm(info, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row);
          SetStatus({
            status: row.status === 1 ? 0 : 1,
            id: row.id,
          }).then((res) => {
            row.status = row.status === 1 ? 0 : 1; // 修改本地数据
          });
        })
        .catch(() => {
          console.log(row);
          ElMessage({
            type: "info",
            message: "取消修改!",
          });
        });
    };
    // 排序规则
    const handleSortChange = () => {
      console.log("排序规则");
    };
    const handleSelectionChange = () => {};
    // 加载数据列表
    const getData = async () => {
      store.dispatch(`admin/${GET_ADMIN_LIST}`);
    };
    // 页码信息修改
    const changeinfo = (value: number) => {
      store.commit(`admin/${PAGE_INFO}`, { curPage: value });
      getData();
    };
    // 搜索
    const Getsreach = (value: string) => {
      store.commit(`admin/${PAGE_INFO}`, { username: value });
      getData();
    };
    onMounted(async () => {
      await getData();
    });
    return {
      tableData,
      tableLabel,
      tableOption,
      loading: (loading as unknown) as boolean,
      selectinput,
      handleButton,
      handleSortChange,
      handleSelectionChange,
      editorDom,
      editorData,
      currentPage: (currentPage as unknown) as number,
      pageinfo,
      changeinfo,
      total,
      Getsreach,
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  padding: 10px;
  background-color: #ffffff;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
  border-radius: 5px 5px 0 0;
  div {
    width: 50%;
    max-width: 600px;
  }
  .add {
    transform: translateX(-100px);
  }
}
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: #ffffff;
  border-radius: 0 0 5px 5px;
}
</style>
