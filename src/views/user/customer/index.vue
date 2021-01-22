<template>
  <header>
    <Sreach :selectinput="selectinput"></Sreach>
  </header>
  <ELTable
    :loading="loading"
    :table-data="tableData"
    :table-label="tableLabel"
    :table-option="tableOption"
  ></ELTable>
  <footer>
    <Pagination :total="100000" class=""></Pagination>
  </footer>
</template>

<script lang="ts">
/**
 * @name 管理用户
 * */
import { defineComponent, reactive, ref } from "vue";
import Sreach from "@/components/sreach.vue";
import ELTable from "@/components/table/table.vue";
import Pagination from "@/components/pagination/pagination.vue";

interface costomerData {
  tableData: any;
  loading: boolean;
  tableLabel: any;
  tableOption: object;
  selectinput: any;
}
export default defineComponent({
  components: {
    ELTable,
    Sreach,
    Pagination,
  },
  setup(): costomerData {
    const tableData = reactive([
      {
        usr: "yy",
        company: "hahahha",
        email: "find@allyum.com",
        registTime: "2019 8",
        status: "1",
      },
      {
        usr: "aa",
        company: "hahahha",
        email: "find@allyum.com",
        registTime: "2019 8",
        status: "1",
      },
      {
        usr: "c",
        company: "hahahha",
        email: "find@allyum.com",
        registTime: "2019 8",
        status: "1",
      },
      {
        usr: "b",
        company: "hahahha",
        email: "find@allyum.com",
        registTime: "2019 8",
        status: "1",
      },
    ]);

    const tableLabel = reactive([
      {
        label: "用户名",
        param: "usr",
        align: "center",
        sortable: true,
        show: true,
      },
      {
        label: "公司名称",
        param: "company",
        align: "center",
        show: false,
      },
      {
        label: "办公邮箱",
        param: "email",
        align: "center",
        width: "200",
        show: true,
      },
      {
        label: "注册时间",
        param: "registTime",
        lign: "center",
        show: true,
        ortable: true,
      },
      {
        label: "审核状态",
        param: "status",
        align: "center",
        show: true,
        sortable: true,
        render: (row: any) => {
          if (row.status === 0) {
            return "未审核";
          } else if (row.status === 1) {
            return "审核通过";
          } else if (row.status === 2) {
            return "审核不通过";
          } else {
            return "禁用";
          }
        },
      },
    ]);

    const loading = ref<boolean>(false);
    const tableOption = reactive({
      label: "操作",
      width: "200",
      options: [
        {
          label: "预览",
          type: "primary",
          icon: "el-icon-view",
          methods: "preview",
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
      {
        label: "手机号码",
        value: "phone",
      },
    ]);
    return {
      tableData,
      tableLabel,
      tableOption,
      loading: (loading as unknown) as boolean,
      selectinput,
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
