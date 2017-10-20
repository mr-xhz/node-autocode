{{P(file)}}

import com.idohoo.o2o.common.verify.VerifyField;
import com.idohoo.o2o.common.vo.BaseBean;

{{I(data.fields)}}

/**
 * @Description 自动生成的代码，不要去修改他
 */
public class {{U(data.table)}}BaseVO extends BaseBean
{
    private static final long serialVersionUID = 1L;

    {{each data.fields as field}}
    /** {{field.Comment}} */
    @VerifyField(value = "{{field.Comment.split(" ")[0]}}",ignore = false)
    private {{field.JavaType.type}} {{field.Field}};
    {{/each}}

    {{each data.fields as field}}
    /////////////////////////////////////////////////////////////////////////////
    // 自动生成的代码，不要去修改他 {{field.Field}} getter and setter
    /////////////////////////////////////////////////////////////////////////////
    public void set{{FU(field.Field)}}({{field.JavaType.type}} {{field.Field}}){
        this.{{field.Field}} = {{field.Field}};
    }
    public {{field.JavaType.type}} get{{FU(field.Field)}}(){
        return this.{{field.Field}};
    }
    {{/each}}
}
