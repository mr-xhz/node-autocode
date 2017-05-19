{{P(file)}}

import java.util.List;

{{P(file).replace("package","import").replace("mapper.custom","po."+U(data.table))}}

public interface {{U(data.table)}}CustomDao{

    /**
     * @Description 批量插入
     * @param list
     * @lastModifier
     */
    public void insertList(List<{{U(data.table)}}> list);

    /**
     * @Description 批量更新
     * @param list
     * @lastModifier
     */
    public void updateList(List<{{U(data.table)}}> list);
}
