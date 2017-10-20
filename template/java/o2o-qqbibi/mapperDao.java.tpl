{{P(file)}}

{{P(file).replace("package","import").replace(".dao",".model."+U(data.table)+"Example")}}
{{P(file).replace("package","import").replace(".dao",".model."+U(data.table))}}
{{P(file).replace("package","import").replace(".dao",".mapper.autocode."+U(data.table)+"Mapper")}}
{{P(file).replace("package","import").replace(".dao",".mapper.custom."+U(data.table)+"CustomDao")}}

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

@Component
public class {{U(data.table)}}MapperDao{

    @Autowired
    private {{U(data.table)}}Mapper {{H(data.table)}}Mapper;

    @Autowired
    private {{U(data.table)}}CustomDao {{H(data.table)}}CustomDao;

    public List<{{U(data.table)}}> selectByExample({{U(data.table)}}Example example){
        return {{H(data.table)}}Mapper.selectByExample(example);
    }

    public List<{{U(data.table)}}> listByPrimaryKey(List<{{data.priField.JavaType.type}}> list){
        if(CollectionUtils.isEmpty(list)){
          return new ArrayList<{{U(data.table)}}>();
        }
        {{U(data.table)}}Example example = new {{U(data.table)}}Example();
        example.createCriteria().and{{FU(data.priField.Field)}}In(list);
        return {{H(data.table)}}Mapper.selectByExample(example);
    }

    public int countByExample({{U(data.table)}}Example example){
        return {{H(data.table)}}Mapper.countByExample(example);
    }

    public void insert({{U(data.table)}} po){
        {{H(data.table)}}Mapper.insertSelective(po);
    }

    public void insertList(List<{{U(data.table)}}> list){
        if(CollectionUtils.isEmpty(list)){
          return;
        }
        {{L(data.table)}}Mapper.insertBatchSelective(list);
    }

    public void update({{U(data.table)}} po){
        {{H(data.table)}}Mapper.updateByPrimaryKeySelective(po);
    }

    public void updateList(List<{{U(data.table)}}> list){
        if(CollectionUtils.isEmpty(list)){
          return;
        }
        {{L(data.table)}}Mapper.updateBatchByPrimaryKeySelective(list);
    }

    public int delete({{data.priField.JavaType.type}} {{data.priField.Field}}){
        return {{H(data.table)}}Mapper.deleteByPrimaryKey({{data.priField.Field}});
    }

    public int deleteList(List<{{data.priField.JavaType.type}}> list){
        if(CollectionUtils.isEmpty(list)){
          return 0;
        }
        {{U(data.table)}}Example example = new {{U(data.table)}}Example();
        example.createCriteria().and{{FU(data.priField.Field)}}In(list);
        return {{H(data.table)}}Mapper.deleteByExample(example);
    }

    public {{U(data.table)}} get({{data.priField.JavaType.type}} {{data.priField.Field}}){
        return {{H(data.table)}}Mapper.selectByPrimaryKey({{data.priField.Field}});
    }
}
